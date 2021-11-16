/*
 *	getGenres Reducer
 * */

export default function getGenres(store, payload) {
	return {
		...store,
		genres: payload,
		loading: store.loading && false,
	}
};
