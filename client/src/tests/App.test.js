import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
// Use the main component 'App'
import App from '../App.js';
import reportWebVitals from '../reportWebVitals.js';
// Needed for making routes.
import { BrowserRouter } from 'react-router-dom';
// Redux for using 'global states'
import { Provider } from 'react-redux';
import store from "../store";

const regexComponent = /(<div)\s*(class="component")\s*(>)/ig; 

describe('One component', () => {
	it('Should render a Component inside the App', () => {
		render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
		);
		
		expect( regexComponent.test(document.body.innerHTML) ).toBeTruthy();
	});
});
