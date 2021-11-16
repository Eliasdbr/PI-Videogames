/*
 *	Input Component
 * */

// React for component based dom structuring.
import React/*, { useState }*/ from "react";
// useDispatch to do actions, useSelector to use the store.
// import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
// import { Link } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
// import { someAction } from '../../actions/index.js';


export default function Input({ title, required, type, }){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	//
	// Functions here.
	function onChange() {

	}
	
	// Structure of the component
	return (
	<div className={style.component}>
		{/*	<label className={style.label}>{title}{required ? '*' : ''}:</label>
			<input className={style.input}
				onChange={onChange}
			/>*/}
	</div>
	);
}
