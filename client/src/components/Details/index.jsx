/*
 *	Details Component
 * */

// React for component based dom structuring.
import React, { useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useParams to get the ID given in the route.
import { useParams } from 'react-router-dom';
// Import local styles
import style from  './style.module.css';
// Import the actions needed.
import { getGameDetail, setLoading } from '../../actions/index.js';

export default function Details( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Get the ID from the route.
	const { id } = useParams();
	// Bring things from the store.
	const { gameDetail, loading } = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	
	//// Functions here.
	//function someFunction() {
	//}
	
	// Component Mount
	useEffect(
		() => {
			dispatch(setLoading());
			dispatch(getGameDetail(id));
		},
		[id, dispatch]
	);
	
	// - - Structure of the component
	// Show the 'Loading' component while we retrieve the data.
	if (loading) return (<h1>Loading...</h1>);
	// If there was an error in back, we show a message.
	else if (gameDetail.msg) return (
		<div>
			<h1>Error</h1>
			<h3>{gameDetail.msg}</h3>
		</div>
	);
	else return (
		<div className={style.component}>
			<img src={gameDetail.background_url} alt='No image.'/>
			<div className={style.data}>
				<h1>{gameDetail.name}</h1>
				<h3>{gameDetail.genres?.map(genre => genre.name).join(', ')}</h3>
				<p className={style.description}>{gameDetail.description}</p>
				<h4>Available platforms:</h4>
				<ul>
					{gameDetail.platforms?.map(platform => <li key={platform.id}>{platform.name}</li>)}
				</ul>
				<p>Release date: {gameDetail.release_date}</p>
				<p>Rating: {gameDetail.rating || 'N/A'}</p>
			</div>
		</div>
	);
}
