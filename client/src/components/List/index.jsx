/*
 *	List Component
 * */

// React for component based dom structuring.
import React, { /*useState,*/ useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useLocation for query params.
import { useLocation, useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Default image path
import defImg from '../../res/img/game_default.png';
// Import the actions needed.
import {
	getVideogames,
	setLoading,
} from '../../actions/index.js';
// Import components
import Loading from '../Loading'
import Card from '../Card'
import PopUp from '../PopUp'

export default function List( /* { prop1, prop2, prop3... } */ ){
	// Bring things from the store.
	const {
		response,
		paginatedResults,
		loading,
		currentPage
	} = useSelector(store => store);
	//// Define the states.
	// const [thisLoading,setThisLoading] = useState(false);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// useLocation to get the query params
	const location = useLocation();
	// Use navigate
	const navigate = useNavigate();
	// Animation style
	//const animStyle = new Array(15).map( (e,i) => {
	//	return `.component *:nth.child(${i+1}) { animation-delay: ${i*0.1}s}`;
	//}).join(' ');
	
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
				queryObj[pair[0]] = pair[1].replace('%20', ' ');
			}
		);
		return queryObj;
	}
	
	// Component update: location
	useEffect(
		() => {
			// If we have results already, we don't need to request again.
			if (!response.length) {
				if (!loading) dispatch(setLoading());
				let query = parseQuery(location);
				dispatch(getVideogames(query.search));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);
	
	// - - Structure of the component
	// Show the 'Loading' component while we retrieve the data.
	return loading 
		? (<Loading/>)
		: (<>
			{parseQuery(location).search 
			&& (<h2>Games matching "{parseQuery(location).search}":</h2>)
			}
			<div className={style.component} >
			{ paginatedResults.length
			? paginatedResults[currentPage]?.map( (result,i) => (
					<Card key={result.id}
						id={result.id}
						name={result.name}
						bg_url={result.background_url || defImg}
						genres={result.genres}
						rate={result.rating}
						pos={i}
					/>)
				)
			: (<PopUp 
					title='Hmmm...' 
					description='No available games match the search criteria.'
					cancelAction={
						parseQuery(location).search 
						? (()=>navigate('/videogames'))
						: (()=>navigate(0))
					}
				/>)
			}
			</div>
		</>);
}
