/*
 *	Search Component
 * */

// React for component based dom structuring.
import React, { useState/*, useEffect*/ } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch/*, useSelector*/ } from "react-redux"
// useNavigate for changing routes.
import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import needed actions
import { resetResponse } from '../../actions';

export default function Search( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	const [input,setInput] = useState('');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// useNavigate
	const navigate = useNavigate();
	
	// Functions here.
	function onSearch(event) {
		event.preventDefault();
		// Reset games list brought from back.
		dispatch(resetResponse());
		// If we have a search query, we include it
		if (input) {
			navigate(`/videogames?search=${input}`);
		} else {
			navigate(`/videogames`);
		}
	}
	function changeHandle(event) {
		setInput(event.target.value);
	}
	
	// Component Mount
	
	// Structure of the component
	return (
		<form className={style.component} onSubmit={e => onSearch(e)}>
			<input type='search' placeholder='Search games...' className={style.search} 
				minLength='1' maxLength='256' size='32' onChange={changeHandle}
			></input>
			<button onClick={e => onSearch(e)}>Search</button>
		</form>
	);
}
