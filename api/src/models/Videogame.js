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
			/*
			// Getter. Inserts the character prefix before returning the ID
			get() {
				return `L${this.getDataValue('id')}`;
			},
			// Setter. Extracts the character prefix before storing the ID
			set(value) {
				this.setDataValue('id', value.slice(1) * 1);
			}
			*/
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		release_date: {
			type: DataTypes.STRING,
		},
		rating: {
			type: DataTypes.STRING,
		},
		// Instead of using a 'Platforms' attribute, I'll create dedicated
		// model for it.
	},{
		timestamps: false
	});
};
