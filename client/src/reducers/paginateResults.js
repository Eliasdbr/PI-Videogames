/*
 *	paginateResults Reducer
 * */

export default function paginateResults(store,payload) {
	return {
		...store,
		paginatedResults: payload,
		currentPage: 0,
		loading: store.loading && false,
	}
};
