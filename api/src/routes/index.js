const { Router } = require('express');

// Import routers
const getVideogames = require('./getVideogames.js');
const getPostVideogameId = require('./getPostVideogameId.js');
const getGenres = require('./getGenres.js');
const getPlatforms = require('./getPlatforms.js');

const router = Router();

// Configure routers
router.use('/videogames', getVideogames);
router.use('/videogame', getPostVideogameId);
router.use('/genres', getGenres);
// Extra
router.use('/platforms', getPlatforms);

module.exports = router;
