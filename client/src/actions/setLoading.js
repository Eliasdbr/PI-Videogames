/*
 *	setLoading Action
 * */
export default function setLoading(value) {
	return { type: 'SET_LOADING', payload: value === false ? false : true};
};
