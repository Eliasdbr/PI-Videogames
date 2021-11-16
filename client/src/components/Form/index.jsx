/*
 *	Form Component
 * */

// React for component based dom structuring.
import React, { useState } from "react";
// useDispatch to do actions, useSelector to use the store.
// import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
// import { Link } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
// import { someAction } from '../../actions/index.js';
// Import the necessary components.

export default function Form( /* { prop1, prop2, prop3... } */ ){
	// Define the states.
	const [errorMsg,setErrorMsg] = useState('');
	const [input,setInput] = useState({
		name: '',
		desc: '',
		date: '',
		rate: 0.0,
		bg_url: '',
		platforms: [],
		genres: []
	});
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	//
	// Functions here.
	function submitHandle() {
		
	}
	function changeHandle(event) {
		// event.target.value = input[event.target.name]; 
		setInput({...input,[event.target.name]: event.target.value}); 
	}
	
	// Structure of the component
	return (
		<div>
			<h3>Submit a new Game to our Database.</h3>
			<form onSubmit={submitHandle} className={style.component}>
				<label>Name:</label>
				<input type='text' name='name' placeholder='Super Mario Bros.' required
					minLength='1' maxLength='256' size='32' onChange={changeHandle}
				></input>
				
				<p>{errorMsg}</p>
			</form>
		</div>
	);
}
