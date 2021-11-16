/*
 *	setLoading Reducer
 * */

export default function setLoading(store) {
	return {
		...store,
		loading: true,
	}
};
