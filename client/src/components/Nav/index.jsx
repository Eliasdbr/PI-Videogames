/*
 *	Nav Component
 * */

// React for component based dom structuring.
import React/*, { useState }*/ from "react";
// useDispatch to do actions, useSelector to use the store.
 import { useDispatch, useSelector } from "react-redux"
// Outlet is used when we put stuff inside Nested Routes.
// in App.js we can see all the routing.
import { Outlet } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { toggleDarkMode } from '../../actions/index.js';

// Components
import Links from '../Links';

export default function Nav( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Bring things from the store.
	const darkMode = useSelector(store => store.darkMode);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	
	//// Functions here.
	//function someFunction() {
	//}
	
	// Structure of the component
	return (
		<>
			<div className={style.component}>
				<Links />
				{/* Light/Dark Mode */}
				<button onClick={() => dispatch(toggleDarkMode())}
				>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
			</div>
		<Outlet />
		</>
	);
}
