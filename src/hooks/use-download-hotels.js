import { useState, useEffect } from 'react';
import { request } from '#utils';

export const useDownloadHotels = (
	searchPhrase = '',
	page,
	PAGINATION_LIMIT,
	country = 'Th',
	price,
) => {
	const [hotels, setHotels] = useState([]);
	const [lastPage, setLastPage] = useState(1);

	console.log(
		'queries in hook: ',
		searchPhrase,
		page,
		PAGINATION_LIMIT,
		country,
		price,
	);

	useEffect(() => {
		fetch(
			`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&price=${price}`,
		)
			// fetch(`/hotels?country=${country}&price=${price}`)
			.then((res) => res.json())
			.then(({ data: { hotels, lastPage } }) => {
				setHotels(hotels);
				setLastPage(lastPage);
			})
			.catch((e) => console.log(e));
	}, [searchPhrase, page, PAGINATION_LIMIT]);

	return { hotels, lastPage };
};
