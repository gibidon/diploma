import { setHotelData } from './set-hotel-data';

export const loadHotelAsync = (requestServer, hotelId) => (dispatch) => {
	requestServer('fetchHotel', hotelId).then((hotelData) => {
		if (hotelData.res) {
			dispatch(setHotelData(hotelData.res));
		}
		return hotelData;
	});
};
