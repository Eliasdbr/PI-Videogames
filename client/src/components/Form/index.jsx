/*
 *	Form Component
 * */

// React for component based dom structuring.
import React, { useState, useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// Link for changing routes.
// import { Link } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { postGame, setLoading } from '../../actions/index.js';
// Import the necessary components.
import Loading from '../Loading';

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
	const store = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	
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
		if (!input.name) setErrorMsg('You need to specify a valid name.');
		else if (!input.desc) setErrorMsg('You need to specify a description.');
		else if (input.platforms.length <= 0) 
			setErrorMsg('You need select at least one Platform.');
		else setErrorMsg('');
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
		if (type === 'checkbox') {
			event.target.checked
				? !input[name].includes(value*1) && 
					setInput((prev) => ({
						...prev,
						[name]: [...prev[name], value*1 ],
					}))
				: setInput((prev) => ({
						...prev,
						[name]: prev[name].filter(e => e !== value*1),
					}))
		}
		else setInput({...input,[name]: value});
	}
	// Once the input changed, check if we need to display an error message
	useEffect( 
		() => {
			updateErrorMsg();
		},
		[input]
	);
	
	const fields = [
		{
			name: 'name', 
			label: 'Name',
			type: 'text',
			placeholder: '"Super Mario Bros."',
			required: true,
			min: 1, max: 32,
		},{
			name: 'desc',
			label: 'Description',
			type: 'text-area',
			placeholder: '"Play as the beloved plumber and rescue the princess in this classic of platformers."',
			required: true,
			min: 1, max: 256, size: 8
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
			min: null, max: null, size: null,
		}
		
	];
	
	// Structure of the component
	return (
		<div>
			<h3>Submit a new Game to our Database.</h3>
			{store.loading 
				? (<Loading/>) 
				: store.response.msg 
					? (<h1>Response from Back</h1>)
			:(<form onSubmit={submitHandle} className={style.component}>
				{/* We iterate each form item */}
				{fields.map(
					(field,i) => (<div key={field.name}>
						{/* Item Label */}
						<label key={field.name+'_item_label'}
							className={
								(!input[field.name] || !input[field.name].length )
								&& field.required ? style.error : ''
							}
						>
							{field.label + (field.required ? '*' : '')}:
						</label>
						{/* Item Container */}
						<div key={field.name+'_item_container'}
							className={
								field.type==='check' ? style.checkCont : style.inputCont
							}
						>
							{ /* Each form item */ 
							 field.type !== 'check'
								? field.type === 'text-area'
									? (<textarea id={field.name} key={field.name+'_form_textarea'}
												className={
													!input[field.name] && field.required 
														? style.inputError : style.desc
												}
												name={field.name} 
												placeholder={field.placeholder || null} 
												required={field.required} onChange={changeHandle}
												 rows='6'
												maxLength={field.max}
											></textarea>)
									: (
									<input id={field.name} key={field.name+'_form_input'}
										className={
											!input[field.name] && field.required 
												? style.inputError : style.inputNorm
										}
										type={field.type} name={field.name} 
										placeholder={field.placeholder || null} 
										required={field.required} onChange={changeHandle}
										minLength={field.min} maxLength={field.max} size={field.size}
										min={field.min} max={field.max} 
									></input>
								)
								: store[field.name]?.map( e => (
									<div key={`${field.name}_${e.name}_check_cont`}
										className={style.check}
									>
										<input id={e.name} key={field.name+'_'+e.name+'check_input'}
											type='checkbox' onChange={(e) => {
												changeHandle(e);
											}} name={field.name}
											value={e.id}
										/>
										<label key={field.name+'_'+e.name+'_check_label'}>{e.name}</label>
									</div>
									)
								)
							}
							{ /* If we just rendered the rating input, we render its value*/
								field.name === 'rate' && (
								<span key={field.name+'rate_span'}>
									{(input.rate>0 ? input.rate : 'N/A')}
								</span>
							)}
						</div>
					</div>)
				)}
				<br/>
				{/* Error message */}
				<p className={style.error} key='errorMsg' >{errorMsg}</p>
				{/* Submit button */}
				<button onClick={submitHandle} disabled={!!errorMsg}>
					<h3>Submit Game</h3>
				</button>
			</form>)}
		</div>
	);
}
