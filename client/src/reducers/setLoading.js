/*
 *	setLoading Reducer
 * */

export default function setLoading(store,payload) {
	return {
		...store,
		loading: payload, 
	}
};
