// -- Videogame model --

const { DataTypes } = require('sequelize');
// We export a function that defines the model.
// We inject it's conection to sequelize later.
module.exports = (sequelize) => {
	sequelize.define('Videogame', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { 
				notEmpty: true
			},
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: false,
			validate: { 
				notEmpty: true
			},
		},
		release_date: {
			type: DataTypes.STRING,
		},
		rating: {
			type: DataTypes.DECIMAL(10,2),
		},
		// *Instead of using a 'Platforms' attribute, I'll create dedicated
		// model for it.
		// *Added: Image url
		background_url: {
			type: DataTypes.STRING,
			validate: { isUrl: true },
		},
	},{
		timestamps: false
	});
};
