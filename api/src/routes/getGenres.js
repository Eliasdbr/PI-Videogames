const { Router } = require('express');
const { getGenres } = require('../utils');

const router = Router();

// - - GET /genres
// - Front requests a list of all genres stored in the DB
router.get(
	'/',
	async (req,res) => {
		try {
			const gen_list = await getGenres();
			res.status(200).json(gen_list);
		}
		catch (error) {
			res.status(400).json({msg: error})
		}
	}
);

module.exports = router;
