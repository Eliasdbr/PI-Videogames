const { Op } = require('sequelize'); 
const { Videogame, Genre } = require('../db.js');

module.exports = async function(name) {
	// Search games in the DB.
	let results = await Videogame.findAll({
		// Searches coincidences by substrings, case insensitive.
		where: name ? {
			name: {
				[Op.iLike]: `%${name}%`
			}
		} : {},
		// Include only attributes we need.
		attributes: ['id','name','background_url','rating'],
		// Also include genres of the game.
		include: {
			model: Genre,
			attributes: ['id','name'],
			through: {attributes: []},
		},
	});
	// Append the L at the start of each ID to make it
	// distiguishable from the API ones.
	// Also convert the rating into Number.
	return results.map(game => {
		return {
			...game.dataValues,
			id: 'L' + game.id,
			rating: game.rating*1
		};
	});
};
