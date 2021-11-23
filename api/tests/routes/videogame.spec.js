/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
	id: 1,
	name: 'Super Marito Bros',
	description: 'Hola que tal',
	background_url: null,
	rating: 5,
	genres: [1,4,8],
	platforms: [4],
};

describe('Videogame routes', () => {
	before(() => conn.authenticate()
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	}));
	beforeEach(() => Videogame.sync({ force: true })
		.then(() => Videogame.create(videogame)));
	describe('GET /videogames', () => {
		it('should get status code 200', () => {
				agent.get('/videogames').expect(200)
			}
		);
		it('should recieve an array', () => {
				agent.get('/videogames').then((res) => {
					expect(Array.isArray(res.body)).toBe(true);
				})
			}
		);
		it('each videogame of the array should be an object', () => {
				agent.get('/videogames').then((res) => {
					expect(typeof res.body[0]).toEqual('object');
				})
			}
		);
		it('each videogame should have the correct properties', async () => {
				agent.get('/videogames').then((res) => {
					expect(typeof res.body[0]).to.have.ownProperty('id');
					expect(typeof res.body[0]).to.have.ownProperty('name');
					expect(typeof res.body[0]).to.have.ownProperty('rating');
					expect(typeof res.body[0]).to.have.ownProperty('genres');
					expect(typeof res.body[0]).to.have.ownProperty('background_url');
				})
			}
		);
		it('if the game ID is 1, we should get in the next format: "L1"', () => {
				agent.get('/videogames').then((res) => {
					expect(res.body[0].id).toEqual('L1');
				})
			}
		);
		it('the Name and Description of a game should be Strings', () => {
				agent.get('/videogames').then((res) => {
					expect(res.body[0].name).to.be.string();
					expect(res.body[0].description).to.be.string();
				})
			}
		);
		it('The list of Genres in a game must be an Array', () => {
				agent.get('/videogames').then((res) => {
					expect(Array.isArray(res.body[0].genres)).toEqual(true);
				})
			}
		);
	});
});
