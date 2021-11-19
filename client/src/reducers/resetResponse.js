/*
 *	resetResponse Reducer
 * */

export default function resetResponse(store) {
	return {
		...store,
		response: [],
	}
};
