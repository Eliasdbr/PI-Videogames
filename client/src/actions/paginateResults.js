/*
 *	paginateResults Action
 * */
export default function paginateResults(response,filtering) {
	// Procedure:
	// filter if needed
	let filtCrit = filtering.filter;	// object containing the filtering criteria
	let results = response.filter( 
		// For each result
		elem => {
			let acc = true;
			for (let prop in filtCrit) {
				// Check every filter option (genre, id)
				let value = filtCrit[prop].toLowerCase();
				acc &= !!(
					value === 'all' 
					|| ( Array.isArray(elem[prop]) 
						? elem[prop].map(genre => genre.name.toLowerCase()).includes(value)
						: elem[prop].includes(value)
					)
				); 
			}
			return !!acc;
		}
	);
	// sort if needed
	let sortCrit = filtering.sort;	// object containing the sorting criteria
	if (sortCrit.type !== 'none') results = results.sort(
		(a,b) => {
			if (a[sortCrit.type] < b[sortCrit.type]) return (sortCrit.ord === 'asc' ? -1 : 1 );
			if (a[sortCrit.type] > b[sortCrit.type]) return (sortCrit.ord === 'asc' ? 1 : -1 );
			return 0;
		}
	);
	// paginate
	// 100 games / 15 games each page = 7 pages
	const PAGE_SIZE = 15;
	let paginated_games = [];
	let page_count = Math.ceil( results.length / PAGE_SIZE );
	for (let i=0; i<page_count; i++) {
		paginated_games.push( results.splice(0,PAGE_SIZE) );
	}
	return { type: 'PAGINATE_RESULTS', payload: paginated_games };
};
