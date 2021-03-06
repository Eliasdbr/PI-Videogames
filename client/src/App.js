// Import dependencies
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, getPlatforms } from './actions';

// Global Styles
import style from './styles/App.module.css';

// Components
import Home from './components/Home';
import Nav from './components/Nav';
import Search from './components/Search';
import Filter from './components/Filter';
import Pager from './components/Pager';
import List from './components/List';
import Details from './components/Details';
import Form from './components/Form';

function App() {
	// Get things from the Store
	const { 
		darkMode,
		genres,
		platforms,
	} = useSelector(store => store);
	// useDispatch to perform actions
	const dispatch = useDispatch();
	// Component Mount
	useEffect(
		() => {
			if (!genres.length) dispatch(getGenres());
			if (!platforms.length) dispatch(getPlatforms());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	
	return (
		<div className={`${style.App} ${darkMode ? style.dark : style.light}`}>
			{/* Content Routes */}
			<Routes>
				<Route path='/' 
					element={<Home />} 
				/>
				{/* The Navigation Bar is everywhere except in Home. */} 
				<Route path='/*' element={<><Nav /><Outlet/></>} >
					{/* The Search component only appears in videogames
							just like the Pager component*/}
					<Route path='videogames' 
						element={(<> 
							<div className={style.searchOptions}>
								<Search /> 
								<hr/>
								<Filter /> 
							</div>
							<div className={style.listContainer}>
								<Pager />
								<List />
								<Pager />
							</div>
						</>)} 
					/>
					<Route path='videogame/:id' 
						element={<Details />}
					/>
					<Route path='submit' 
						element={<Form />}
					/>
					{/*Default Route*/}
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
