/*
 *	getGenres Action
 * */
import axios from 'axios';

export default function getGenres() {
	return function(dispatch){
		return axios.get('http://localhost:3001/genres')
			.then( 
				response => { 
					dispatch({type: 'GET_GENRES', payload: response.data || {}});
				},
				error => {
					dispatch({type: 'GET_GENRES', payload: error.response.data || {}});
				}
			)
	}
};
