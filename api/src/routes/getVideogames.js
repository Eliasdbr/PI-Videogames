const { Router } = require('express');
// Import routers
// const authRouter = require('./auth.js');
const control = require('../controllers');

const router = Router();

// - - GET /videogames
// -Front requests a list of 100 games, 
//  each containing: {id, name, image_url, genres[]}
// - - GET /videogames?search={name}
// -Front request a list of 15 games whose names match the string
//  sent via the query parameter 'search'
router.get(
	'/',
	async (req,res) => {
		const { search } = req.query || null;
		const result = await control.getGames(search);
		let code = result.msg ? 400 : 200;
		res.status(code).json(result);
	}
);

module.exports = router;
