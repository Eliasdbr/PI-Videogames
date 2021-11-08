// -- Genres model --

const { DataTypes } = require('sequelize');
// We export a function that defines the model.
// We inject it's conection to sequelize later.
module.exports = (sequelize) => {
	sequelize.define('Genre', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	},{
		timestamps: false
	});
};
