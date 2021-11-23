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
// Import Icons
import iconFilter from '../../res/img/filter.png';
import iconSort from '../../res/img/sort.png';
import iconSortNameA from '../../res/img/sort-alpha.png';
import iconSortNameD from '../../res/img/sort-alpha-desc.png';
import iconSortRateA from '../../res/img/sort-rate.png';
import iconSortRateD from '../../res/img/sort-rate-desc.png';
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
			<div className={style.sorter}>
				<img src={ filtering.sort.type === 'none' 
					? iconSort 
					: filtering.sort.type === 'name'
						? filtering.sort.ord === 'asc'
							? iconSortNameA : iconSortNameD
						: filtering.sort.ord === 'asc'
							? iconSortRateA : iconSortRateD
				}/>
				<select name='type' onChange={(e) => changeHandle(e,'sort')}
					value={filtering.sort.type} className={style.leftBtn}>
					<option value='none'>- Sort by -</option>
					<option value='name'>Name</option>
					<option value='rating'>Rating</option>
				</select>
				<select name='ord' onChange={(e) => changeHandle(e,'sort')}
					value={filtering.sort.ord} disabled={filtering.sort.type==='none'}
					className={style.rightBtn}>
					<option value='asc'> ASC </option>
					<option value='desc'> DESC </option>
				</select>
			</div>
			<div className={style.filter}>
				<img src={iconFilter}/>
				<select name='genres' onChange={(e) => changeHandle(e,'filter')}
					value={filtering.filter.genres} className={style.leftBtn}>
					<option key='All' value='all'>- Genre -</option>
					{genres.map(
						e => (
							<option value={e.name.toLowerCase()}
								key={e.name} >{e.name}</option>
						)
					)}
				</select>
				<select name='id' onChange={(e) => changeHandle(e,'filter')}
					value={filtering.filter.id} className={style.rightBtn}>
					<option value='all'>- Source -</option>
					<option value='L'>Database</option>
					<option value='A'>API</option>
				</select>
			</div>
			<button onClick={applyFilters}>Apply</button>
		</div>
	);
}
