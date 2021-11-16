/*
 *	toggleDarkMode Reducer
 * */

export default function toggleDarkMode(store) {
	return {
		...store,
		darkMode: !store.darkMode
	}
};
