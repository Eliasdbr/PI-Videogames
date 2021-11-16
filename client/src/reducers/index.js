/*
 *	Reducers
 * */

import getGenres from './getGenres.js';
import getVideogames from './getVideogames.js';
import getPlatforms from './getPlatforms.js';
import getGameDetail from './getGameDetail.js';
import toggleDarkMode from './toggleDarkMode.js';
import setLoading from './setLoading.js';

// Store's initial state.
// Main structure of the store
const initialState = {
	response: [],
	
	paginatedResults: [],
	
	gameDetail: {},
	
	sort: {
		type: 'none', // none, alpha, rating,
		ord: 'asc',	// asc, desc
	},
	
	filter: {
		genre: null, // null, genre_id
		procedence: null, // null, api, db
	},
	
	genres: [],
	
	platforms: [],
	
	darkMode: true,
	
	loading: false,
};

export default function rootReducer(store = initialState, action) {
	switch (action.type) {
		case 'GET_GENRES': return getGenres(store,action.payload);
		case 'GET_PLATFORMS': return getPlatforms(store,action.payload);
		case 'GET_VIDEOGAMES': return getVideogames(store,action.payload);
		case 'GET_GAME_DETAIL': return getGameDetail(store,action.payload);
		case 'TOGGLE_DARK_MODE': return toggleDarkMode(store);
		case 'SET_LOADING': return setLoading(store);
		
		default: return store;
	}
};
