/*
 *	List Component
 * */

// React for component based dom structuring.
import React, { useState, useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
// import { Link } from 'react-router-dom';
// Import local styles
import './style.module.css';
// Import the actions needed.
import { getVideogames } from '../../actions/index.js';

export default function List( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Bring things from the store.
	const videogames = useSelector(store => store.videogames);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	//
	//// Functions here.
	//function someFunction() {
	//}
	
	dispatch(getVideogames);

	// Structure of the component
	return (
		<h1>List</h1>
	);
}
