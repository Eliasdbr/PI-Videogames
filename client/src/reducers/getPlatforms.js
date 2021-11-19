/*
 *	getPlatforms Reducer
 * */

export default function getPlatforms(store, payload) {
	return {
		...store,
		platforms: payload,
	}
};
