/*
 *	List Component
 * */

// React for component based dom structuring.
import React, { useState, useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useLocation for query params.
import { useLocation } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { getVideogames, setLoading } from '../../actions/index.js';
// Import components
import Loading from '../Loading'
import Pager from '../Pager'

export default function List( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Bring things from the store.
	const {response, loading} = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// useLocation to get the query params
	const location = useLocation();
	
	// Functions here.
	// Turns a route query string into an object
	// it gets the query by the useLocation hook
	function parseQuery(location) {
		// If there's no search parameter, we return an empty object.
		if (!location.search) return {};
		// Create the object which will contain the parsed query.
		let queryObj = {};
		// Take the query string and separates it by the &'s
		let queryPairs = location.search.replace('?','')
																		.split('&');
		// Take each key=value string and splits them into more elements
		queryPairs.forEach( 
			e => {
				let pair = e.split('=');
				// Store each pair as a key=value pair in the queryObj.
				queryObj[pair[0]] = pair[1];
			}
		);
		return queryObj;
	}
	
	// Component mount
	useEffect(
		() => {
			dispatch(setLoading());
			let query = parseQuery(location);
			// We comment it for now to avoid multiple calls to the api
			dispatch(getVideogames(query.search));
		},
		[dispatch,location]
	);
	
	// - - Structure of the component
	// Show the 'Loading' component while we retrieve the data.
	if (loading) return (<Loading/>);
	// If there was an error in back, we show a message.
	else if (response.msg) return (
		<div>
			<h1>Error</h1>
			<h3>{response.msg}</h3>
		</div>
	);
	return (
		<div className={style.component}>
			<Pager/>
			<h1>List</h1>
			<Pager/>
		</div>
	);
}
