// All the logic for handling information goes here
//
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

// Import the DB models
const { Op } = require('sequelize'); 
const { Videogame, Genre, Platform } = require('../db.js');

const PAGE_SIZE = 15; // Max games per page.
const SEARCH_PAGE_SIZE = 15; // Max games in the search page.
const MAX_GAMES = 100;// Max games in total.

module.exports = {
	// Search games in the DB.
	getGamesDB: async function(name) {
		let results = await Videogame.findAll({
			// Searches coincidences by substrings, case insensitive.
			where: name ? {
				name: {
					[Op.iLike]: `%${name}%`
				}
			} : {},
			// Include only attributes we need.
			attributes: ['id','name','background_url'],
			// Also include genres of the game.
			include: {
				model: Genre,
				attributes: ['id','name'],
				through: {attributes: []},
			},
		});
		// Append the L at the start of each ID to make it
		// distiguishable from the API ones.
		return results.map(game => {
			return { ...game.dataValues, id: 'L' + game.id};
		});
	},
	
	// Search games in the API
	// NOTE: Since the API has a maximum quantity of results per page,
	//       We'll need to make 4 simoultaneous requests with 25 results
	//       each, and the only way to get all 100 results, is using
	//       the '&page=x' query parameter.
	getGamesAPI: async function(name) {
		var response = {};
		// Requests the games list.
		// if we have a search query, we search the 1st 15 coincidences.
		if (name) {
			try {
				console.log('Axios: Requesting Games Search List.');
				response = await axios.get(
					`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
				);
				console.log('Axios: OK.');
				response = response.data.results;
			}
			// If for some reason we get an error from the API, we abort.
			catch (e) {return {msg: 'Error trying to get the data from the API.'}}
		} else {
			// If you want all 100 games, you're gonna get'em.
			try{
				console.log('Axios: Requesting Games Complete List.');
				// Brace for all 4 requests of 25 games each!
				let promises = [1,2,3,4].map( async (e) => await axios.get(
					`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`
				));
				console.log('Axios: OK.');
				// We process the 4 responses here 
				response = await Promise.all(promises);
				// We need to put them together in the same array, too.
				response = response.reduce( 
					(prev,curr) => {
						return prev.concat(curr.data.results);
					},
					[] // initial value: empty array
				);
			}
			// If for some reason we get an error from the API, we abort.
			catch (e) {return {msg: 'Error trying to get the data from the API.'}}
		}
		
		// Filters only the necessary data (id, name, image, genres)
		// and returns it
		return response.map(
			(data) => {
				return {
					id: 'A' + data.id,
					name: data.name,
					background_url: data.background_image,
					genres: data.genres.map(
						// For each genre I only need the id and name.
						genre => {
								return {
									id: genre.id,
									name: genre.name
								}
							}
						),
				};
			}
		);
		
	},
	
	// Go find a list of games matching the search name.
	getGames: async function(name) {
		// Get the games from the DB.
		let results = await this.getGamesDB(name);
		// Add to the results, the games from the API.
		results = results.concat(await this.getGamesAPI(name));
		// If we search games, we limit the results to 15,
		// otherwise, we limit the results to 100.
		// If we want the whole list of games, we'll need to paginate
		results.splice(name ? SEARCH_PAGE_SIZE : MAX_GAMES);
		if (name) {
			if (results.length === 0) return { msg: `There's no games with '${name}' in their name.` };
		}
		return results;
	},
	
	getGameDetail: async function(id) {
		// First we check where to go search the id
		// A = Stored in API, L = Stored locally in DB.
		const local = id[0] === 'L';
		// To get the real Id, trim the letter at the start.
		// Forces it to an integer
		const idNumber = Math.floor( id.slice(1)*1 );
		// if the id is invalid, return an error message.
		if (isNaN(idNumber))
			return {msg: `'${id}' is an invalid ID.`};
		// If is a local id, we search the game in the DB.
		if (local) {
			return await Videogame.findByPk(
				idNumber, 
				// Equivalent of sql's JOIN. Combine with related tables.
				{include: [
					{
						model: Genre,
						attributes: ['id','name'],
						through: {attributes: []},
					},
					{
						model: Platform,
						attributes: ['id','name'],
						through: {attributes: []},
					},
				]}
			)
			|| {msg: `Couldn't find the game with id:${idNumber} locally.`};
		}
		// If is a API id, we search the game in the API.
		else {
			// Requests the game details.
			console.log('Axios: Requesting Game Details.');
			try{
				const response = await axios.get(
					`https://api.rawg.io/api/games/${idNumber}?key=${API_KEY}`
				);
				console.log('Axios: OK.');
				// Filters only the necessary data.
				return {
					name: response.data.name,
					// Note: that regexp removes any markup tag from the description.
					//       we use it because the API contains the desc
					//       in HTML format.
					description:  response.data
																.description
																.replace(/<(.|\n)*?>/g, ''),
					release_date: response.data.released,
					rating: response.data.rating,
					background_url: response.data.background_image,
					genres: response.data.genres.map(
						// For each genre I only need the id and name.
						genre => {
								return {
									id: genre.id,
									name: genre.name
								}
							}
						),
					platforms: response.data.platforms.map(
						// For each genre I only need the id and name.
						element => {
								return {
									id: element.platform.id,
									name: element.platform.name
								}
							}
						),
				};
			}
			catch (error) {
				return {msg: `Couldn't find the game with id:${idNumber} in the API.`};
			}
		}
	},
	
	// Stores a game into the DB with the data as an object.
	// If the id already exists, it will return null.
	// Otherwise, it returns the id of the game created.
	postGame: async function({name, desc, date, rate, genres, platforms, bg_url}) {
		// If we recieve a name, description and at least 1 platform (we should),
		// we try to store it in our DB.
		if (name && desc && platforms.length > 0) {
			const [submitted,created] = await Videogame.findOrCreate({
				where: { name },
				defaults: {
					description: desc,
					release_date: date || null,
					rating: rate || null,
					background_url: bg_url || null,
				}
			});
			
			let msg = '';
			// If it doesn't exists, we store it and reply the success.
			if (created) {
				submitted.addGenres(genres);
				submitted.addPlatforms(platforms);
				msg = 'Videogame submitted successfully';
			}
			// If it does exists, we respond that the game already exists.
			else {
				msg = 'Videogame already exists';
			}
			return {
				id: 'L' +  submitted.id, // send back its ID
				created, // it was created and stored?
				msg // message
			};
		}
		// If (for some reason) we have not recieved the required data:
		else return {msg: 'Back2Front: control your forms!!'};
	},
	
	getGenresAPI: async function() {
		// Requests a list of the genres
		console.log('Axios: Requesting Genres List...');
		const response = await axios.get(
			`https://api.rawg.io/api/genres?key=${API_KEY}`
		);
		console.log('Axios: OK.');
		// Filters only the necesary data.
		return response.data.results.map(
			// For each genre I only need the id and name.
			genre => {
				return {
					id: genre.id,
					name: genre.name
				}
			}
		);
	},
	
	// Returns a list of all the genres
	getGenres: async function() {
		// First search the genres in the DB
		let genres_list = await Genre.findAll();
		// if there's no genres stored, go find them from the API
		if (!genres_list.length) { 
			genres_list = await this.getGenresAPI();
			// and store it locally so we don't have to request the API again.
			await Genre.bulkCreate(genres_list);
		}
		return genres_list;
	},
	
	getPlatformsAPI: async function() {
		// Requests a list of the genres
		console.log('Axios: Requesting Platforms List.');
		const response = await axios.get(
			`https://api.rawg.io/api/platforms?key=${API_KEY}`
		);
		console.log('Axios: OK.');
		// Filters only the necesary data.
		return response.data.results.map(
			// For each genre I only need the id and name.
			platform => {
				return {
					id: platform.id,
					name: platform.name
				}
			}
		);
	},
	
	// Returns a list of all the platforms
	getPlatforms: async function() {
		// First search the platforms in the DB
		let platforms_list = await Platform.findAll();
		// if there's no platforms stored, go find them from the API
		if (!platforms_list.length) { 
			platforms_list = await this.getPlatformsAPI();
			// and store it locally so we don't have to request the API again.
			await Platform.bulkCreate(platforms_list);
		}
		return platforms_list;
	},
}
