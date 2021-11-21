/*
 *	Card Component
 * */

// React for component based dom structuring.
import React/*, { useState }*/ from "react";
// useDispatch to do actions, useSelector to use the store.
// import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
// import { someAction } from '../../actions/index.js';

export default function Card( { id, name, bg_url, genres } ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	// Navigate to change routes.
	const navigate = useNavigate();
	// Styles for setting the card background
	const background_style = {
		backgroundImage: `url(${bg_url})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};
	
	//// Functions here.
	function goToGame(event) {
		navigate(`/videogame/${id}`);
	}
	
	// Structure of the component
	return (
		<div onClick={goToGame} className={style.component}
			style={background_style}>
			{/*<img src={bg_url} width='400'/>*/}
			<h4 className={style.title}>{name}</h4>
			<p className={style.genres}>{
				genres?.map(genre => genre.name).join(', ')
			}</p>
		</div>
	);
}
