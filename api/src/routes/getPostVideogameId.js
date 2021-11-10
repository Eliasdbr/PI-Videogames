const { Router } = require('express');
const { postGame } = require('../utils');

const router = Router();

// - - GET /videogame/{id}
// - Front requests all details from the game specified by the
//   route param 'id'
router.get(
	'/:id',
	async (req,res) => {
		res.status(200).json({msg: req.params.id});
	}
);

// - - POST /videogame
// - Front requests writing data in our DB, with the data sent
//   via the body.
router.post(
	'/',
	async (req,res) => {
		const response = await postGame(req.body);
		if (response.id) res.status(200).json(response);
		else res.status(400).json(response);
	}
);

module.exports = router;
