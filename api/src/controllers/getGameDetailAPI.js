// Import API functions dependencies.
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async function (idNumber) {
	// Requests the game details.
	console.log('Axios: Requesting Game Details...');
	try{
		const response = await axios.get(
			`https://api.rawg.io/api/games/${idNumber}?key=${API_KEY}`
		);
		console.log('Axios: [OK] Game Details recieved.');
		// Filters only the necessary data.
		return {
			id: 'A' + idNumber,
			name: response.data.name,
			// Note: that regexp removes any markup tag from the description.
			//       we use it because the API contains the desc
			//       in HTML format.
			description: await response.data.description
				.replace(/<(.|\n)*?>/g, '')
				.replace(/\*\*\*/g, '\n')
				.replace(/&amp;/g,  '&')
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g,  "'"),
			release_date: response.data.released,
			rating: response.data.rating,
			background_url: response.data.background_image,
			genres: response.data.genres.map(
				// For each genre I only need the id and name.
				genre => {
						return {
							id: genre.id,
							name: genre.name
						}
					}
				),
			platforms: response.data.platforms.map(
				// For each genre I only need the id and name.
				element => {
						return {
							id: element.platform.id,
							name: element.platform.name
						}
					}
				),
		};
	}
	catch (error) {
		return {msg: `Couldn't find the game with id:${idNumber} in the API.`};
	}
};
