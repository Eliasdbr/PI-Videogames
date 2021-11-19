/*
 *	paginateResults Action
 * */
export default function paginateResults(response,filtering) {
	// Procedure:
	// filter if needed
	/*
	let filtCrit = filtering.filter;	// object containing the filtering criteria
	response = response.filter( 
		// For each result
		elem => {
			console.log(elem);
			let acc = true;
			for (let prop in filtCrit) {
				// Check every filter option (genre, id)
				let value = filtCrit[prop];
				acc &= (value === 'all' || elem[prop].includes(value) ); 
			}
			return acc;
		}
	);
	*/
	// sort if needed
	// paginate
	return { type: 'PAGINATE_RESULTS', payload: response };
};
