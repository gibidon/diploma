import { useState, useEffect } from 'react';
import { useLoading } from '#hooks';

export const useFetch = (url, options = {}) => {
	// let [done, setDone] = useState(false);
	let [data, setData] = useState([]);
	let [error, setError] = useState(null);
	const { setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);
		fetch(url, options)
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
		// .finally(() => setDone(true));
	}, [url]);

	// return { done, data, error };
	return { data, error };
};
