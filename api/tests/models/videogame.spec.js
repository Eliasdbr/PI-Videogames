const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
	before(() => conn.authenticate()
		.catch((err) => {
			console.error('Unable to connect to the database:', err);
		}));
	describe('Validators', () => {
		beforeEach(() => Videogame.sync({ force: true }));
		describe('name', () => {
			it('Should throw an error if name is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('Should throw an error if name is empty', () => {
				Videogame.create({ name: '' })
					.then(() => done(new Error('The name cannot be empty')))
					.catch(() => done());
			});
		});
		describe('description', () => {
			it('Should throw an error if description is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid description')))
					.catch(() => done());
			});
		});
	});
});
