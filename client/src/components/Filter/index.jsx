/*
 *	Filter Component
 * */

// React for component based dom structuring.
import React, { useEffect } from "react";
// useDispatch to do actions, useSelector to use the store.
import { useDispatch, useSelector } from "react-redux"
// useNavigate for changing routes.
// import { useNavigate } from 'react-router-dom';
// Import local styles
import style from './style.module.css';
// Import the actions needed.
import { setFiltering, paginateResults, setLoading} from '../../actions/index.js';

export default function Filter( /* { prop1, prop2, prop3... } */ ){
	//// Define the states.
	// const [state,setState] = useState('default_value');
	// Bring things from the store.
	const { genres, filtering, response} = useSelector(store => store);
	// Dispatch for making actions.
	const dispatch = useDispatch();
	
	// Functions here.
	// Some Input changes
	function changeHandle(event,filt_type) {
		dispatch(
			setFiltering({
				...filtering,
				// filt_type: sort, filter...
				[filt_type]: {
					...filtering[filt_type],
					// sort: type,ord | filter: genre, procedence
					[event.target.name]: event.target.value,
				}
			})
		); 
	}
	// Apply filters Button
	function applyFilters() {
		dispatch(setLoading());
		// Calls the Pagination action
		dispatch(paginateResults(response,filtering));
	}
	
	// Component update
	useEffect(
		() => {
			if (response.length) {
				applyFilters();
			}
		},
		[response]
	);
	
	// Structure of the component
	return (
		<div className={style.component}>
			<label>Sort by: </label>
			<select name='type' onChange={(e) => changeHandle(e,'sort')}
				value={filtering.sort.type}>
				<option value='none'>None</option>
				<option value='alpha'>Name</option>
				<option value='rating'>Rating</option>
			</select>
			<label>Order: </label>
			<select name='ord' onChange={(e) => changeHandle(e,'sort')}
				value={filtering.sort.ord} disabled={filtering.sort.type==='none'}>
				<option value='asc'>ASC</option>
				<option value='desc'>DESC</option>
			</select>
			<p>Filter by:</p>
			<label>Genre: </label>
			<select name='genres' onChange={(e) => changeHandle(e,'filter')}
				value={filtering.filter.genres}>
				<option key='All' value='all'>All</option>
				{genres.map(
					e => (
						<option value={e.name.toLowerCase()}
							key={e.name} >{e.name}</option>
					)
				)}
			</select>
			<label>Source: </label>
			<select name='id' onChange={(e) => changeHandle(e,'filter')}
				value={filtering.filter.id}>
				<option value='all'>All</option>
				<option value='L'>Database</option>
				<option value='A'>API</option>
			</select>
			<button onClick={applyFilters}>Apply</button>
		</div>
	);
}
