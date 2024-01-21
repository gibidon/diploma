import { useState } from 'react';

export const useInsideFunc = (num) => {
	const [fakestate, setFakeState] = useState(num);

	const fakeFetch = () => {
		setFakeState(fakestate + 1);
	};

	return { fakestate, fakeFetch };
};
