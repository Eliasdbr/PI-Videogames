const { Router } = require('express');
const { getPlatforms } = require('../controllers');

const router = Router();

// - - GET /platforms
// - Front requests a list of all genres stored in the DB
router.get(
	'/',
	async (req,res) => {
		const result = await getPlatforms();
		let code = result.msg ? 400 : 200;
		res.status(code).json(result);
	}
);

module.exports = router;
