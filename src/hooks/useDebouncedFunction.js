import { useRef } from 'react';

export const useDebouncedFunction = (func, delay) => {
	const ref = useRef(null);

	return (...args) => {
		clearTimeout(ref.current);
		ref.current = setTimeout(() => func(...args), delay);
	};
};
