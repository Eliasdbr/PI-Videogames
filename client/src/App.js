// Import dependencies
import React/*, { useState }*/ from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Global Styles
import './styles/App.css';

// Components
import Home from './components/Home';
import Nav from './components/Nav';
import Search from './components/Search';
import List from './components/List';
import Details from './components/Details';
import Form from './components/Form';

function App() {
	// Get things from the Store
	const darkMode = useSelector(store => store.darkMode);
	return (
		<div className={`App ${darkMode ? 'dark' : 'light'}`}>
			{/* Content Routes */}
			<Routes>
				<Route path='/' 
					element={<Home />} 
				/>
				{/* The Navigation Bar is everywhere except in Home. */} 
				<Route path='/*' element={<Nav />} >
					{/* The Search component only appears in videogames
							just like the Pager component*/}
					<Route path='videogames' 
						element={<> <Search /> <List /> </>} 
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
