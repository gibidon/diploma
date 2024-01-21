import { setHotelData } from './set-hotel-data';
import { request } from '#utils';

export const loadHotelAsync = (hotelId) => (dispatch) =>
	request(`/hotel/${hotelId}`).then((hotelData) => {
		if (hotelData.data) {
			dispatch(setHotelData(hotelData.data));
		}
		// console.log('hotelData before sending: ', hotelData);
		return hotelData;
	});
