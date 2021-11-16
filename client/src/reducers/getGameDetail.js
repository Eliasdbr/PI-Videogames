/*
 *	getGameDetail Reducer
 * */

export default function getGameDetail(store, payload) {
	return {
		...store,
		gameDetail: payload,
		loading: store.loading && false,
	}
};
