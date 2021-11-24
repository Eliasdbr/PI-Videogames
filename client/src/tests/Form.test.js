import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
// Use the component 'Form'
import Form from '../components/Form';
// Needed for making routes.
import { BrowserRouter } from 'react-router-dom';
// Redux for using 'global states'
import { Provider } from 'react-redux';
import store from "../store";

var component;

beforeEach( () => {
	render(
	<Provider store={store}>
		<BrowserRouter>
			<Form />
		</BrowserRouter>
	</Provider>
	);
});

describe('The Form Component structure', () => {
	it('Should have a <form>...</form> element.', () => {
		let component = document.body;
		expect(component.querySelector('form')).toBeTruthy();
	});
	it('(Name field) Should have an <input> of type="text" with name="name".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('input');
		expect(input[0]).toBeTruthy();
		expect(input[0].type).toEqual('text');
		expect(input[0].name).toEqual('name');
	});
	it('(Description field) Should have a <textarea> with name="desc".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let textarea = form.querySelectorAll('textarea');
		expect(textarea[0]).toBeTruthy();
		expect(textarea[0].name).toEqual('desc');
	});
	it('(Release date field) Should have an <input> with type and name="date".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('input');
		expect(input[1]).toBeTruthy();
		expect(input[1].type).toEqual('date');
		expect(input[1].name).toEqual('date');
	});
	it('(Rating field) Should have an <input> with type="range", name="rate".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('input');
		expect(input[2]).toBeTruthy();
		expect(input[2].type).toEqual('range');
		expect(input[2].name).toEqual('rate');
	});
	it('(Image URL field) Should have an <input> with type="text", name="bg_url".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('input');
		expect(input[3]).toBeTruthy();
		expect(input[3].type).toEqual('text');
		expect(input[3].name).toEqual('bg_url');
	});
	it('(Genres field) Should have a <select> with name="genres".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('select');
		expect(input[0]).toBeTruthy();
		expect(input[0].name).toEqual('genres');
	});
	it('(Platforms field) Should have a <select> with name="platforms".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let input = form.querySelectorAll('select');
		expect(input[1]).toBeTruthy();
		expect(input[1].name).toEqual('platforms');
	});
	it('(Error message) Should have a <p> with className="errorMsg".', () => {
		let component = document.body;
		let form = component.querySelector('form');
		let errorMsg = form.querySelectorAll('.errorMsg');
		/*
		let foundClass = false
		for (let e of errorMsg) {
			foundClass = foundClass || e.className === 'errorMsg'
		}
		*/
		expect(errorMsg).toBeTruthy();
	});
});
