// All the logic for handling information goes here
//
const {Videogame,Genre,Platform} = require('../db.js');

module.exports = {
	getGamesDB: function() {
	},
	
	getGamesAPI: function() {
	},
	
	// Stores a game into the DB with the data as an object.
	// If the id already exists, it will return null.
	// Otherwise, it returns the id of the game created.
	postGame: async function({name, desc, date, rate, genres, platforms}) {
		/*
			we recieve:
			{
				name(string),
				description(string),
				release_date(date_string),
				rating(number)
				genres[ids]
				platforms[ids]
			}
			we send:
			{ id(string), msg(string) }
		*/
		// If we recieve a name, description
		// and at least 1 platform (we should),
		// we try to store it in our DB.
		if (name && desc && platforms.length > 0) {
			const [submitted,created] = await Videogame.findOrCreate({
				where: { name },
				defaults: {
					description: desc,
					release_date: date || null,
					rating: rate || null,
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
	
	getGenresDB: function() {
	},
	
	getGenresAPI: function() {
	},
	
	getPlatformsDB: function() {
	},
	
	getPlatformsAPI: function() {
	},

}
