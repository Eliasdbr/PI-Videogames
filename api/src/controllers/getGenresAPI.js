// Import API functions dependencies.
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async function() {
	// Requests a list of the genres
	try {
		console.log('Axios: Requesting Genres List...');
		const response = await axios.get(
			`https://api.rawg.io/api/genres?key=${API_KEY}`
		);
		console.log('Axios: [OK] Genres List recieved.');
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
	}
	// If there's an error with the API response, we send a message.
	catch (e) { return { msg: 'Error while requesting genres list to API.' };}
};
