/*
 *	postGame Reducer
 * */

export default function postGame(store, payload) {
	return {
		...store,
		response: payload,
		loading: store.loading && false,
	}
};
