/*
 *	Details Component
 * */

// React for component based dom structuring.
import React, { useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useParams to get the ID given in the route.
import { useParams, useNavigate } from 'react-router-dom';
// Import local styles
import style from  './style.module.css';
// Default image path
import defImg from '../../res/img/game_default.png';
// Import the actions needed.
import { getGameDetail, setLoading } from '../../actions/index.js';
// Import components
import Loading from '../Loading'
import PopUp from '../PopUp'

export default function Details( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	//const [state,setState] = useState('default_value');
	// Get the ID from the route.
	const { id } = useParams();
	// Bring things from the store.
	const { gameDetail, loading } = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// useNavigate to change routes.
	const navigate = useNavigate();
	// Styles for setting the card background
	const background_style = {
		backgroundImage: `url(${gameDetail.background_url || defImg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
	};
	
	//// Functions here.
	//function someFunction() {
	//}
	
	// Component Mount
	useEffect(
		() => {
			if (id !== gameDetail.id) {
				dispatch(setLoading());
				dispatch(getGameDetail(id));
			}
		},
		[id, dispatch]
	);
	
	// - - Structure of the component
	// Show the 'Loading' component while we retrieve the data.
	if (loading) return (<Loading/>);
	// If there was an error in back, we show a message.
	else if (gameDetail.msg) return (
		<PopUp title='Hmmm...'
			description={gameDetail.msg}
			cancelAction={() => navigate('/videogames')}
		/>
	);
	else return (
		<div className={style.component} style={background_style}>
			<div className={style.imgContainer}></div>
			<div className={style.title}>
				<h1 >{gameDetail.name}</h1>
				<h3>{gameDetail.genres?.map(genre => genre.name).join(', ')}</h3>
			</div>
			<div className={style.data}>
				<div className={style.half1}>
					<p className={style.description}>{gameDetail.description}</p>
				</div>
				<div className={style.half2}>
					<div className={style.rateDate}>
						<h1>🟊 {gameDetail.rating || 'N/A'}</h1>
						<h1>⏲ {gameDetail.release_date}</h1>
					</div>
					<h2>Available platforms:</h2>
					<ul>
						{gameDetail.platforms?.map(platform => <li key={platform.id}>{platform.name}</li>)}
					</ul>
				</div>
			</div>
		</div>
	);
}
