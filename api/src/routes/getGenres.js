const { Router } = require('express');
const { getGenres } = require('../controllers');

const router = Router();

// - - GET /genres
// - Front requests a list of all genres stored in the DB
router.get(
	'/',
	async (req,res) => {
		const result = await getGenres();
		let code = result.msg ? 400 : 200;
		res.status(code).json(result);
	}
);

module.exports = router;
