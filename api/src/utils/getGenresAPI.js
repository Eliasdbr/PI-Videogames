// Import API functions dependencies.
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async function() {
	// Requests a list of the genres
	console.log('Axios: Requesting Genres List...');
	const response = await axios.get(
		`https://api.rawg.io/api/genres?key=${API_KEY}`
	);
	console.log('Axios: OK.');
	// Filters only the necesary data.
	return response.data.results.map(
		// For each genre I only need the id and name.
		genre => {
			return {
				id: genre.id,
				name: genre.name
			}
		}
	);
};
