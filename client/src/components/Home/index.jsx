/*
 *	Home Component
 * */

// React for component based dom structuring.
import React, { useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useNavigate for changing routes based on different actions.
import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the Logo
import Logo from '../../res/img/logo.png';
// Import the actions needed.
import { getGenres, getPlatforms } from '../../actions/index.js';

export default function Home( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Bring things from the store.
	const {genres, platforms} = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// Instead of using link, we use navigate for the 'Start!' Button
	const navigate = useNavigate();
	//
	//// Functions here.
	//function someFunction() {
	//}
	//
	
	// Structure of the component
	return (
		<div className={style.component}>
			<img src={Logo} width='96' height='96'/>
			<h1>Frame-Buffer Videogames</h1>
			<h2>What will you master next?</h2>
			<button onClick={
				() => navigate('/videogames')
			} >Start!</button>
		</div>
	);
}
