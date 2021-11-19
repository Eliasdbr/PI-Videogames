/*
 *	Reducers
 * */

import getGenres from './getGenres.js';
import getVideogames from './getVideogames.js';
import getPlatforms from './getPlatforms.js';
import getGameDetail from './getGameDetail.js';
import toggleDarkMode from './toggleDarkMode.js';
import setLoading from './setLoading.js';
import setFiltering from './setFiltering.js';
import setPage from './setPage.js';
import resetResponse from './resetResponse.js';
import paginateResults from './paginateResults.js';

// Store's initial state.
// Main structure of the store
const initialState = {
	response: [],
	
	paginatedResults: [],
	
	currentPage: 0,
	
	gameDetail: {},
	
	filtering: {
		sort: {
			type: 'none', // none, alpha, rating,
			ord: 'asc',	// asc, desc
		},
		filter: {
			genres: 'all', // all, genre_name
			id: 'all', // all, 'A', 'L'
		},
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
		case 'SET_FILTERING': return setFiltering(store,action.payload);
		case 'SET_PAGE': return setPage(store,action.payload);
		case 'RESET_RESPONSE': return resetResponse(store);
		case 'PAGINATE_RESULTS': return paginateResults(store,action.payload);
		
		default: return store;
	}
};
