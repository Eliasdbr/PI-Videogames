/*
 *	setPage Reducer
 * */

export default function setPage(store,payload) {
	return {
		...store,
		currentPage: payload,
	}
};
