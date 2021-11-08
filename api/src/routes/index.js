const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// - - GET /videogames
// -Front requests a list of 100 games, 
//  each containing: {id, name, image_url, genres[]}
// - - GET /videogames?search={name}
// -Front request a list of 15 games whose names match the string
//  sent via the query parameter 'search'
router.get(
	'/videogames',
	(req,res) => {
		if (req.query.search) res.status(200).json({msg: req.query.search});
		else res.status(200).json({msg: 'Hola mundo!'});
	}
);

// - - GET /videogame/{id}
// - Front requests all details from the game specified by the
//   route param 'id'
router.get(
	'/videogame/:id',
	(req,res) => {
		res.status(200).json({msg: req.params.id});
	}
);


// - - GET /genres
// - Front requests a list of all genres stored in the DB
router.get(
	'/genres',
	(req,res) => {
		res.status(200).json({msg: 'Hola generos!'});
	}
);


// - - POST /videogame
// - Front requests writing data in our DB, with the data sent
//   via the body.
router.post(
	'/videogame',
	(req,res) => {
		res.status(200).json(req.body);
	}
);


module.exports = router;
