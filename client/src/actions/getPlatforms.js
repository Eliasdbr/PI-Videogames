/*
 *	getPlatforms Action
 * */
import axios from 'axios';

export default function getPlatforms() {
	return function(dispatch){
		return axios.get('http://localhost:3001/platforms')
			.then( 
				response => { 
					dispatch({type: 'GET_PLATFORMS', payload: response.data || {}});
				},
				error => {
					dispatch({type: 'GET_PLATFORMS', payload: error.response.data || {}});
				}
			)
	}
};
