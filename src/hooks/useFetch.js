import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
	// let [done, setDone] = useState(false);
	let [data, setData] = useState([]);
	let [error, setError] = useState(null);

	useEffect(() => {
		fetch(url, options)
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((e) => setError(e));
		// .finally(() => setDone(true));
	}, []);

	// return { done, data, error };
	return { data };
};
