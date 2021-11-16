/*
 *	getVideogames Action
 * */
import axios from 'axios';

export default function getVideogames(name) {
	return function(dispatch){
		return axios.get(
			'http://localhost:3001/videogames' + name ? '?name='+name : ''
		).then( 
			response => { 
				dispatch({type: 'GET_VIDEOGAMES', payload: response.data || {}});
			},
			error => {
				dispatch({type: 'GET_VIDEOGAMES', payload: error.response.data || {}});
			}
		)
	}
};
