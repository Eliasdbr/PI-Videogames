// Import the DB models used
const { Videogame, Genre, Platform } = require('../db.js');

module.exports = async function(idNumber) {
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
};
