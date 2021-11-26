/*
 *	Links Component
 * */

// React for component based dom structuring.
import React/*, { useState }*/ from "react";
// useDispatch to do actions, useSelector to use the store.
// import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
import { NavLink } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the logo
import Logo from '../../res/img/logo.png';
// Import the actions needed.
// import { someAction } from '../../actions/index.js';


export default function Links( /* { prop1, prop2, prop3... } */ ){
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
	return (
		<div className={style.component}>
			<NavLink to='/'
				className={
					navData => {
						return `${style.link} ${navData.isActive ? style.linkActive : ''}`
					}
				}
			><img src={Logo} width='32' height='32' alt='Main Logo'/>Home</NavLink>
			<NavLink to='/videogames'
				className={
					navData => {
						return `${style.link} ${navData.isActive ? style.linkActive : ''}`
					}
				}
			>Videogames</NavLink>
			<NavLink to='/submit'
				className={
					navData => {
						return `${style.link} ${navData.isActive ? style.linkActive : ''}`
					}
				}
			>Submit game</NavLink>
		</div>
	);
}
