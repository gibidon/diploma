import { useState } from 'react';
import { LoadingContext } from '#contexts';

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const value = { loading, setLoading };

	return (
		<LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
	);
};
