/*
 *	getVideogames Reducer
 * */

export default function getVideogames(store, payload) {
	return {
		...store,
		response: payload,
	}
};