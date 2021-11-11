const { Router } = require('express');
const { 
	getGameDetail,
	getGameDetailDB,
	postGame
} = require('../controllers');

const router = Router();

// - - GET /videogame/{id}
// - Front requests all details from the game specified by the
//   route param 'id'
router.get(
	'/:id',
	async (req,res) => {
		const { id } = req.params;
		const response = await getGameDetail(id);
		let code = response.msg ? 400 : 200;
		res.status(code).json(response);
	}
);

// - - POST /videogame
// - Front requests writing data in our DB, with the data sent
//   via the body.
router.post(
	'/',
	async (req,res) => {
		const response = await postGame(req.body);
		let code = response.id ? 200 : 400;
		res.status(code).json(response);
	}
);

module.exports = router;
