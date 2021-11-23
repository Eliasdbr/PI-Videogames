/*
 *	Loading Component
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

export default function Loading( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	//
	//// Functions here.
	//function someFunction() {
	//}
	
	// Structure of the component
	return (<div className={style.component}>
		<div className={style.animLogo}>
			<div className={style.dot} id={style.d1}></div>
			<div className={style.dot} id={style.d2}></div>
			<div className={style.dot} id={style.d3}></div>
			<div className={style.dot} id={style.d4}></div>
			<div className={style.dot} id={style.d5}></div>
			<div className={style.dot+' '+style.space}></div>
			<div className={style.dot} id={style.d6}></div>
		</div>
	</div>);
}
