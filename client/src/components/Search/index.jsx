/*
 *	Search Component
 * */

// React for component based dom structuring.
import React, { useState, useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useNavigate for changing routes.
import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { someAction } from '../../actions/index.js';

export default function Search( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	const [input,setInput] = useState('');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	// useNavigate
	const navigate = useNavigate();
	
	// Functions here.
	function onSearch() {
		if (input) navigate(`/videogames?search=${input}`);
	}
	function changeHandle(event) {
		setInput(event.target.value);
	}
	
	// Component Mount
	useEffect(
		// Enter Keypress listener.
		() => window.addEventListener(
			'keypress',
			// If there's some input and the key enter was pressed, search.
			(event) => input && event.keyCode === 13 && onSearch()
		)
	);
	
	// Structure of the component
	return (
		<div className={style.component}>
			<input type='text' placeholder='Search games...' 
				minLength='1' maxLength='256' size='32' onChange={changeHandle}
			></input>
			<button onClick={onSearch}>Search</button>
		</div>
	);
}
