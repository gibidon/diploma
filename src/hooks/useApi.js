import { useState, useEffect, useContext } from 'react';
import ApiContext from '#contexts/api';

export default function useApi(key, ...args) {
	const api = useContext(ApiContext);
	const apiFn = key.split('.').reduce((obj, name) => obj[name], api);

	// const [done, setDone] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		apiFn(...args)
			.then((text) => setData(text))
			.catch((e) => setError(e));
		// .finally(() => setDone(true));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// return { done, data, error };
	return { data, error };
}
