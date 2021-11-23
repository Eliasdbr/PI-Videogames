/*
 *	Form Component
 * */

// React for component based dom structuring.
import React, { useState, useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import default Image.
import defImg from '../../res/img/game_default.png';
// Import the actions needed.
import { postGame, setLoading } from '../../actions/index.js';
// Import the necessary components.
import Loading from '../Loading';
import PopUp from '../PopUp';

export default function Form( /* { prop1, prop2, prop3... } */ ){
	// Define the states.
	const [errorMsg,setErrorMsg] = useState('Please fill the required fields.');
	const [input,setInput] = useState({
		name: '',
		desc: '',
		date: '',
		rate: 5.0,
		bg_url: '',
		platforms: [],
		genres: []
	});
	// Bring things from the store.
	const {loading, response, genres, platforms} = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	// Use Navigate
	const navigate = useNavigate();

	// Validation RegExps
	/* source: http://urlregex.com/ */ 
	const regexUrl =/^$|((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i;
	const regexNotEmpty = /(?!^$)/; 
	
	// Functions here.
	function submitHandle(event) {
		event.preventDefault();
		if (!errorMsg) {
			dispatch(setLoading());
			// Submit action
			dispatch(postGame(input));
		}
		else alert('You have required fields to complete!');
	}
	// Update error message
	function updateErrorMsg() {
		// Input control
		if (!input.name) {
			setErrorMsg('You need to specify a valid name.');
		} else if (!input.desc) {
			setErrorMsg('You need to specify a description.');
		} else if (!regexUrl.test(input.bg_url)) {
			setErrorMsg('If you want to provide an URL, make sure it\'s correct.');
		} else if (input.platforms.length <= 0) {
			setErrorMsg('You need select at least one Platform.');
		} else {
			setErrorMsg('');
		}
	}
	// Listens to input changes
	function changeHandle(event) {
		// event.target.value = input[event.target.name]; 
		let {
			name,
			value,
			type,
			id,
		} = event.target;
		if (name === 'genres' || name === 'platforms') {
			if (value*1 > 0 && !input[name].includes(value*1)) {
				setInput((prevInput) => ({
					...prevInput,
					[name]: [...prevInput[name], value*1 ],
				})); 
			}
		}
		else setInput({...input,[name]: value});
	}
	// Delete 1 item from an array in Input (Genres, Platforms)
	function deleteFromList(name,id) {
		setInput((prevInput) => ({
			...prevInput,
			[name]: prevInput[name].filter(e => e !== id),
		}))
	}
	// Once the input changed, check if we need to display an error message
	useEffect( 
		() => {
			updateErrorMsg();
		},
		[input]
	);
	
	// Structure of the component
	// If its loading, show it.
	if (loading) return <Loading />;
	// If there's a response from back, show a PopUp.
	else if (response.msg) return (
		<PopUp title={response.created ? 'Success' : 'Error'}
			description={response.msg}
			okName='View Game Details'
			okAction={() => navigate(`/videogame/${response.id}`)}
		/>
	);
	// If neither of the above happened, we show the form.
	else return (
		<form onSubmit={submitHandle} className={style.component}>
			<h2>Submit your Game to our Database.</h2>
			<div className={style.twoHalves}>
			<div className={style.half1}>
{/*** Name Field ***/}
				<label className={
					!regexNotEmpty.test(input.name) 
					? style.error : ''
				}>Name*:</label>
				<input className={
						!regexNotEmpty.test(input.name)
						? style.inputError : style.inputNorm
					}
					type='text' name='name' placeholder='Type here the Name of your Game.'
					required onChange={changeHandle} maxLength='256'
				></input>
{/*** Description Field ***/}
				<label className={
					!regexNotEmpty.test(input.desc) 
					? style.error : ''
				}>Description*:</label>
				<textarea className={
						!regexNotEmpty.test(input.desc) 
						? style.inputError : style.inputNorm
					}
					name='desc' placeholder="Type here your Game's description."
					required onChange={changeHandle} rows='6'
					maxLength='1024'
				></textarea>
{/*** Release Date Field***/}
				<div className={style.rateDate}>
					<div className={style.inputCont}>
						<label>Release Date:</label>
						<input className={style.inputNorm+' '+style.date} 
							type='date' name='date' onChange={changeHandle} 
						></input>
					</div>
{/*** Rating Field ***/}
					<div className={style.inputCont}>
						<label>Rating: {input.rate ? input.rate+'/5' : 'N/A'}</label>
						<input className={style.inputNorm} type='range' name='rate'
							onChange={changeHandle} min='0' max='5'
						></input>
					</div>
				</div>
{/*** Image Field ***/}
				<div className={style.inputCont}>
					<label className={
						!regexUrl.test(input.bg_url) 
						? style.error : ''
					}>Image URL:</label>
					<input className={
							!regexUrl.test(input.bg_url)
							? style.inputError : style.inputNorm
						}
						type='text' name='bg_url' 
						placeholder='You can choose an URL for the Image for your Game.'
						onChange={changeHandle} maxLength='256'
					></input>
					<label>Image Preview:</label>
					<img className={style.imgPreview} src={input.bg_url || defImg}
						width='300' height='180'/>
				</div>
			</div>
{/*** Genres Selection ***/}
			<div className={style.half2}>
				<label>Genres:</label>
				<div className={style.tagsField}>
					{input.genres?.map(
						genre => (
							<button key={genre} onClick={() => deleteFromList('genres',genre)}
							>{genres?.find(g => g.id === genre).name} [x]</button>
						)
					)}
					<select name='genres' onChange={changeHandle} value='0'>
						<option value='0'>Add a Genre</option>
						{genres?.map(genre => (
							<option key={genre.id} value={genre.id} >{genre.name}</option>
						))}
					</select>
				</div>
{/*** Platforms Selection ***/}
				<label className={ !input.platforms.length ? style.error : '' }
				>Platforms*:</label>
				<div className={style.tagsField}>
					{input.platforms?.map(
						platform => (
							<button key={platform} onClick={
								() => deleteFromList('platforms',platform)
							}
							>{platforms?.find(p => p.id === platform).name} [x]</button>
						)
					)}
					<select name='platforms' onChange={changeHandle} value='0'>
						<option value='0'>Add a Platform</option>
						{platforms?.map(platform => (
							<option key={platform.id} value={platform.id}
							>{platform.name}</option>
						))}
					</select>
				</div>
			</div>
			</div>
{/*** Submit Button ***/}
			<hr/>
			<button onClick={submitHandle} disabled={!!errorMsg}
				className={style.submit}>
				<h2>Submit Game</h2>
			</button>
{/*** Error Message ***/}
			<p className={style.error} key='errorMsg' >{errorMsg}</p>
		</form>
	);
}
