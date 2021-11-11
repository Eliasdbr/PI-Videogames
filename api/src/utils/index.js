//
// - - All the logic for handling information goes here
//

// Import the API & DB functions
const getGamesDB = require('./getGamesDB.js');
const getGamesAPI = require('./getGamesAPI.js');
const getGameDetailDB = require('./getGameDetailDB.js');
const getGameDetailAPI = require('./getGameDetailAPI.js');
const getGenresAPI = require('./getGenresAPI.js');
const getPlatformsAPI = require('./getPlatformsAPI.js');

// Import the DB models
const { Videogame, Genre, Platform } = require('../db.js');

const PAGE_SIZE = 15; // Max games per page.
const SEARCH_PAGE_SIZE = 15; // Max games in the search page.
const MAX_GAMES = 100;// Max games in total.

module.exports = {
	getGamesDB,
	getGamesAPI,
	getGameDetailDB,
	getGameDetailAPI,
	getGenresAPI,
	getPlatformsAPI,
	
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
	
	// Go find the details of a game with the specified id.
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
			
			//console.log(this.getGameDetailDB);
			return await getGameDetailDB(idNumber);
		}
		// If it's an API id, we search the game in the API.
		else {
			return await getGameDetailAPI(idNumber);
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
