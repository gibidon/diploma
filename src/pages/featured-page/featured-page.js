import { useApi } from '#hooks';
import { useEffect, useState } from 'react';
import { request } from '#utils';

export const FeaturedPage = () => {
	const [featuredHotels, setFeaturedHotels] = useState();

	console.log(featuredHotels);

	useEffect(() => {
		request('/hotels/featured').then((featuredHotels) => {
			console.log('fh: ', featuredHotels);
			setFeaturedHotels(featuredHotels);
		});
	}, []);

	return (
		<div>
			featured:
			{featuredHotels?.map((hotel, index) => (
				<div key={index}>{hotel.title}</div>
			))}
		</div>
	);
};
