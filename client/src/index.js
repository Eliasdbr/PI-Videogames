// Allows us to use component-base styling and structuring
import React from 'react';
import ReactDOM from 'react-dom';
// Import styles
import './styles/index.css';
// Use the main component 'App'
import App from './App';
import reportWebVitals from './reportWebVitals';
// Needed for making routes.
import { BrowserRouter } from 'react-router-dom';
// Redux for using 'global states'
import { Provider } from 'react-redux';
import store from "./store";


ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
