const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
	before(() => conn.authenticate()
		.catch((err) => {
			console.error('Unable to connect to the database:', err);
		}));
	describe('Validators', () => {
		beforeEach(() => Videogame.sync({ force: true }));
		describe('ID', () => {
			it('Should throw an error if the ID is repeated', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Name',
					description: 'Hola que tal',
					background_url: null,
					rating: 5,
				});
				Videogame.create({ 
					id: 1,
					name: 'Otro name',
					description: 'Hola que tal',
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('The ID must be unique')))
					.catch(() => done());
			});
		});
		describe('Name', () => {
			it('Should throw an error if name is null', (done) => {
				Videogame.create({ 
					id: 1,
					name: null,
					description: 'Hola que tal',
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('Should throw an error if name is empty', () => {
				Videogame.create({ 
					id: 1,
					name: '',
					description: 'Hola que tal',
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('The name cannot be empty')))
					.catch(() => done());
			});
		});
		describe('Description', () => {
			it('Should throw an error if description is null', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Super Marito Bros',
					description: null,
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('It requires a valid description')))
					.catch(() => done());
			})
			it('Should throw an error if description is empty', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Super Marito Bros',
					description: '',
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('The description cannot be empty')))
					.catch(() => done());
			});
			it('Should throw an error if description is empty', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Super Marito Bros',
					description: '',
					background_url: null,
					rating: 5,
				})
					.then(() => done(new Error('The description cannot be empty')))
					.catch(() => done());
			});
		});
		describe('Image URL', () => {
			it('It can be ommited.', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Super Marito Bros',
					description: 'Something Something',
					background_url: null,
					rating: 5,
				})
					.then(() => done());
			})
			it('But it should throw an error if it is incorrect', (done) => {
				Videogame.create({ 
					id: 1,
					name: 'Super Marito Bros',
					description: 'Something Something',
					background_url: 'this is not an URL',
					rating: 5,
				})
					.then(() => done(new Error('The URL must have the correct format')))
					.catch(() => done());
			})
		});
	});
});
