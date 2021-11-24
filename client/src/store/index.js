/*
*	Setup the store and import the necessary middleware.
*	Thunk for async funcionalities and dev-tools for debugging.
*/

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

import reduxDevTools from './enhancers.js';

const store = createStore(
	rootReducer,
	compose(applyMiddleware(thunk))
);

export default store;

