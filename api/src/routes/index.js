const { Router } = require('express');

// Import routers
const getVideogames = require('./getVideogames.js');
const getPostVideogameId = require('./getPostVideogameId.js');
const getGenres = require('./getGenres.js');

const router = Router();

// Configure routers
router.use('/videogames', getVideogames);
router.use('/videogame', getPostVideogameId);
router.use('/genres', getGenres);

module.exports = router;
