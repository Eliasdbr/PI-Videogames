/*
 *	setFiltering Reducer
 * */

export default function setFiltering(store,payload) {
	return {
		...store,
		filtering: payload,
	}
};
