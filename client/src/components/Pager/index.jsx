/*
 *	Pager Component
 * */

// React for component based dom structuring.
import React/*, { useState }*/ from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
// import { Link } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { setPage } from '../../actions/index.js';

export default function Pager( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Bring things from the store.
	const { paginatedResults, currentPage } = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	
	// Functions here.
	// Change Page
	function goToPage(number) {
		// Call setPage action.
		dispatch(setPage(number));
	}
	
	// Structure of the component
	return (
		<div className={style.component}>
			{/* First Page*/}
			<button disabled={currentPage===0}
				onClick={()=>goToPage(0)}>{'<<'}</button>
			{/* Previous Page*/}
			<button disabled={currentPage===0}
				onClick={()=>goToPage(currentPage-1)}>{'<'}</button>
			{/* Pages */}
			{paginatedResults?.map(
				(elem,i)=>{
					return (<button key={i} disabled={currentPage===i}
				onClick={()=>goToPage(i)}>{i+1}</button>);
				}
			)}
			{/* Next Page */}
			<button disabled={currentPage===paginatedResults.length-1}
				onClick={()=>goToPage(currentPage+1)}>{'>'}</button>
			{/* Last Page */}
			<button disabled={currentPage===paginatedResults.length-1}
				onClick={()=>goToPage(paginatedResults.length-1)}>{'>>'}</button>
		</div>
	);
}
