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
	// Setting up the form fields.
	const fields = [
		{
			name: 'name', 
			label: 'Name',
			type: 'text',
			placeholder: '"Super Mario Bros."',
			required: true,
			validation: regexNotEmpty,
			min: 1, max: 32,
		},{
			name: 'desc',
			label: 'Description',
			type: 'text-area',
			placeholder: '"Play as the beloved plumber and rescue the princess in this classic of platformers."',
			required: true,
			validation: regexNotEmpty,
			min: 1, max: 1024, size: 8
		},{
			name: 'date', 
			label: 'Release date',
			type: 'date',
			required: false,
			min: null, max: null, size: null
		},{
			name: 'rate',
			label: 'Rating',
			type: 'range',
			min: 0,
			max: 5,
			required: false,
			size: null,
		},{ 
			name: 'bg_url',
			label: 'Image URL',
			type: 'url',
			placeholder: '"http://image.address.example/1a2b3c4d"',
			required: false,
			validation: regexUrl,
			min: 1, max: 256, size: 32
		},
		// Genres
		{
			name: 'genres',
			label: 'Genres',
			type: 'check',
			placeholder: null,
			required: false,
			min: null, max: null, size: null,
		},
		// Platforms *
		{
			name: 'platforms',
			label: 'Platforms',
			type: 'check',
			placeholder: null,
			required: true,
			validation: regexNotEmpty,
			min: null, max: null, size: null,
		}
	];
	
	// Functions here.
	function submitHandle(event) {
		event.preventDefault();
		if (!errorMsg) {
			dispatch(setLoading());
			// Submit action
			dispatch(postGame(input));
		}
		else {
			// Pop Up
		}
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
		// Borra Generos o plataformas
		/*
		*/
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
			<label>Release Date:</label>
			<input className={style.inputNorm} type='date' name='date' 
				onChange={changeHandle} 
			></input>
{/*** Rating Field ***/}
			<label>Rating: {input.rate ? input.rate+'/5' : 'N/A'}</label>
			<input className={style.inputNorm} type='range' name='rate'
				onChange={changeHandle} min='0' max='5'
			></input>
{/*** Image Field ***/}
			<label className={
				!regexUrl.test(input.bg_url) 
				? style.error : ''
			}>Image URL:</label>
			<input className={
					!regexUrl.test(input.bg_url)
					? style.inputError : style.inputNorm
				}
				type='text' name='bg_url' 
				placeholder='You can choose an URL for the Image of yout Game.'
				onChange={changeHandle} maxLength='256'
			></input>
{/*** Genres Selection ***/}
			<label>Genres:</label>
			<div className={style.tagsField}>
				{input.genres?.map(
					genre => (
						<button key={genre} onClick={() => deleteFromList('genres',genre)}
						>{genres?.find(g => g.id === genre).name} [x]</button>
					)
				)}
				<select name='genres' onChange={changeHandle}>
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
				<select name='platforms' onChange={changeHandle}>
					<option value='0'>Add a Platform</option>
					{platforms?.map(platform => (
						<option key={platform.id} value={platform.id}
						>{platform.name}</option>
					))}
				</select>
			</div>
		</form>
	);
}
