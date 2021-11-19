/*
 *	setLoading Reducer
 * */

export default function setLoading(store) {
	return {
		...store,
		loading: store.loading || true,
	}
};
