import { transformHotel } from '../transformers/transform-hotel';

export const getHotel = (hotelId) =>
	fetch(`http://localhost:3000/hotels/${hotelId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Error 404. Page not found..'
					: 'Something wrong happened. Please try again later..';

			return Promise.reject(error);
		})
		.then((loadedHotel) => loadedHotel.json())
		.then((loadedHotel) => loadedHotel && transformHotel(loadedHotel));
