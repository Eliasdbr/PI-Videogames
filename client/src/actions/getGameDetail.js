/*
 *	getGameDetail Action
 * */
import axios from 'axios';

export default function getGameDetail(id) {
	return function(dispatch){
		return axios.get('http://localhost:3001/videogame/' + (id || ''))
			.then( 
				response => { 
					dispatch({type: 'GET_GAME_DETAIL', payload: response.data || {}});
				},
				error => {
					dispatch({type: 'GET_GAME_DETAIL', payload: error.response.data || {}});
				}
			)
	}
};
