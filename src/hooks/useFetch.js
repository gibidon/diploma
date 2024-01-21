import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
	console.log('url in useFetch,opts: ', url, options);

	const [data, setData] = useState({});
	// const [error, setError] = useState(null);

	useEffect(() => {
		fetch(url, options)
			.then((response) => response.json())
			.then(({ data }) => {
				console.log('de', data);
				setData(data);
			})
			.catch((e) => {
				// setError(e);
				console.log(e);
			});
	}, [url, options]);

	// return { data, error };
	return { data };
};
