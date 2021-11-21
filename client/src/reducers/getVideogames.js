/*
 *	getVideogames Reducer
 * */

export default function getVideogames(store, payload) {
	let newStore = {
		...store,
		response: payload,
	}
	// If we got an error message, we interrupt the loading
	if (payload.msg) {
		newStore.paginatedResults = [];
		newStore.loading = false;
	}
	return newStore;
};
