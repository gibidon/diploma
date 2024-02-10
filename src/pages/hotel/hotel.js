import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { loadHotelAsync, RESET_HOTEL_DATA } from '#actions';
import { useLoading, useApi } from '#hooks';
import { ROLES } from '#constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotel } from '#selectors';
import { HotelForm, HotelContent } from './components';
import { Loader, PrivateContent } from '#components';

export const Hotel = () => {
	console.log('rendering hotel page..');

	const [error, setError] = useState(null);
	const { loading, setLoading } = useLoading();

	const params = useParams();
	const dispatch = useDispatch();
	const hotel = useSelector(selectHotel);

	console.log('hotel', hotel);

	const isCreating = useMatch('/hotel/create');
	const isEditing = useMatch(`/hotel/${params.id}/edit`);

	useLayoutEffect(() => {
		dispatch(RESET_HOTEL_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setLoading(false);
			return;
		}

		setLoading(true);

		dispatch(loadHotelAsync(params.id)).then((hotelData) => {
			setError(hotelData.error);
			setLoading(false);
		});
	}, [dispatch, params.id, isCreating, setLoading]);

	// const { data } = useApi('hotels.one', params.id);

	// const hotel = data?.hotel;
	// console.log(hotel);

	const SpecificHotelPage =
		isEditing || isCreating ? (
			<PrivateContent accessRoles={[ROLES.ADMIN]} serverError={error}>
				{/* <HotelForm hotelData={hotel} /> */}
				<HotelForm hotel={hotel} />
			</PrivateContent>
		) : (
			// <HotelContent hotelData={hotel} />
			<HotelContent hotelData={hotel} />
		);

	if (loading) return <Loader />;

	return error ? <div>Error: {error} </div> : SpecificHotelPage;
};
