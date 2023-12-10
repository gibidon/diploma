import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession); //done only once
	// console.log('forming function out of useServerRequest hook..');

	return useCallback(
		(operation, ...params) => {
			// console.log('using useCallback to create request function..');
			const request = [
				'register',
				'authorize',
				'fetchHotel',
				'fetchHotels',
			].includes(operation)
				? params
				: [session, ...params]; //session  key inserted
			return server[operation](...request);
		},
		[session], //new function gets created if session changes
	);
};
