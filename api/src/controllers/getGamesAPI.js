// Import all the API functions depencencies.
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

// Search games in the API
// NOTE: Since the API has a maximum quantity of results per page,
//       We'll need to make 4 simoultaneous requests with 25 results
//       each, and the only way to get all 100 results, is using
//       the '&page=x' query parameter.
module.exports = async function(name) {
	var response = {};
	// Requests the games list.
	// if we have a search query, we search the 1st 15 coincidences.
	if (name) {
		try {
			console.log('Axios: Requesting Games Search List...');
			response = await axios.get(
				`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
			);
			console.log('Axios: [OK] Search List recieved.');
			response = response.data.results;
		}
		// If for some reason we get an error from the API, we abort.
		catch (e) {return {msg: 'Error trying to get the data from the API.'}}
	} else {
		// If you want all 100 games, you're gonna get'em.
		try{
			console.log('Axios: Requesting Games Full List...');
			// Brace for all 4 requests of 25 games each!
			let promises = [1,2,3,4].map( async (e) => await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`
			));
			console.log('Axios: [OK] Full List recieved.');
			// We process the 4 responses here 
			response = await Promise.all(promises);
			// We need to put them together in the same array, too.
			response = response.reduce( 
				(prev,curr) => {
					return prev.concat(curr.data.results);
				},
				[] // initial value: empty array
			);
		}
		// If for some reason we get an error from the API, we abort.
		catch (e) {return {msg: 'Error trying to get the data from the API.'}}
	}
	
	// Filters only the necessary data (id, name, image, genres)
	// and returns it
	return response.map(
		(data) => {
			return {
				id: 'A' + data.id,
				name: data.name,
				background_url: data.background_image,
				genres: data.genres.map(
					// For each genre I only need the id and name.
					genre => {
							return {
								id: genre.id,
								name: genre.name
							}
						}
					),
			};
		}
	);
	
};
