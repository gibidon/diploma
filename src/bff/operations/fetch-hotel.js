import { getHotel } from '../api';

export const fetchHotel = async (hotelId) => {
	let hotel;
	let error;

	try {
		hotel = await getHotel(hotelId);
	} catch (hotelDownloadError) {
		error = hotelDownloadError;
	}

	if (error) {
		return { error, res: null };
	}

	// const images = await getImages...

	return { error: null, res: hotel };
};
