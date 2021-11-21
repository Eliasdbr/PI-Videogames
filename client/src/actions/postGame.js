/*
 *	postGame Action
 * */
import axios from 'axios';

export default function postGame(form) {
	return function(dispatch){
		return axios.post('http://localhost:3001/videogame',form)
			.then( 
				response => { 
					dispatch({type: 'POST_GAME', payload: response.data || {}});
				},
				error => {
					dispatch({type: 'POST_GAME', payload: error.response.data || {}});
				}
			)
	}
};
