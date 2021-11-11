// Import API functions dependencies.
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async function() {
	// Requests a list of the genres
	try {
		console.log('Axios: Requesting Platforms List...');
		const response = await axios.get(
			`https://api.rawg.io/api/platforms?key=${API_KEY}`
		);
		console.log('Axios: [OK] Platforms List recieved.');
		// Filters only the necesary data.
		return response.data.results.map(
			// For each genre I only need the id and name.
			platform => {
				return {
					id: platform.id,
					name: platform.name
				}
			}
		);
	}
	catch (e) { return { msg: 'Error while requesting platforms list to API.' };}
};
