/*
 *	PopUp Component
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

export default function PopUp(
	{ title, description, okName, okAction, cancelName, cancelAction }) {
	//// Define the states.
	//const [state,setState] = useState('default_value');
	//// Bring things from the store.
	//const store = useSelector(store => store);
	//// Dispatch for making actions.
	//const dispatch = useDispatch();
	// Navigate for changing routes.
	const navigate = useNavigate();
	//
	//// Functions here.
	//function someFunction() {
	//}
	
	// Structure of the component
	return (<div className={style.component}>
		<div className={style.window}>
			<h3 className={style.title}>{title}</h3>
			<p className={style.description}>{description}</p>
			<div className={style.buttons}>
				{ (okName && okAction) 
					&& (<button onClick={okAction}>{okName}</button>) 
				}
				<button 
					onClick={cancelAction || ((e)=>navigate(0))} // reloads the page
				>{cancelName || 'Close'}</button>
			</div>
		</div>
	</div>);
}
