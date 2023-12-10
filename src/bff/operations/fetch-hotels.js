import { getHotels } from '../api/get-hotels';

export const fetchHotels = async () => {
	const hotels = await getHotels();
	console.log(hotels);
	// console.log(hotels);

	return { error: null, hotels: hotels };
};
