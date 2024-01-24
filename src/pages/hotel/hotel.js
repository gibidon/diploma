import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { loadHotelAsync, setHotelData, RESET_HOTEL_DATA } from '#actions';
import { Link } from 'react-router-dom';
import { ROLES } from '#constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole, selectHotel } from '#selectors';
import { request } from '#utils';
import { Slider, Reviews, HotelForm, HotelContent } from './components';
import { PrivateContent, Loader } from '#components';
import styles from './hotel.module.css';

export const Hotel = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const params = useParams();
	const dispatch = useDispatch();
	// const userLogin = useSelector(selectUserLogin);
	const hotelData = useSelector(selectHotel);

	// console.log('hot: ', hotelData, typeof hotelData);

	const isCreating = useMatch('/hotel/create');
	const isEditing = useMatch(`/hotel/${params.id}/edit`);

	useLayoutEffect(() => {
		dispatch(RESET_HOTEL_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadHotelAsync(params.id)).then((hotelData) => {
			setError(hotelData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	const book = async (userLogin, hotelId) => {
		await request(`/book`, 'POST', { userLogin, hotelId });
	};

	if (isLoading) return <Loader />;

	const SpecificHotelPage =
		isEditing || isCreating ? (
			<PrivateContent accessRoles={[ROLES.ADMIN]} serverError={error}>
				<HotelForm hotelData={hotelData} />
			</PrivateContent>
		) : (
			<HotelContent hotelData={hotelData} />
		);
	//TODO comments error upon creation

	return error ? <div>error</div> : SpecificHotelPage;

	// return isEditing ? (
	// 	<div>loading,editing</div>
	// ) : (
	// 	<div className={styles.hotel}>
	// 		<h1>{title} &#9733;</h1>
	// 		<div className={styles.content}>
	// 			<Slider images={images} />
	// 			<div className={styles.description}>
	// 				<span className={styles.description_country}>Country: {country}</span>
	// 				{description}
	// 				<span className={styles.description_price}>
	// 					Price: {price} $ per night
	// 				</span>

	// 				<button
	// 					className={styles.bookBtn}
	// 					onClick={() => book(userLogin, params.id)}
	// 				>
	// 					Book now
	// 				</button>
	// 			</div>
	// 		</div>
	// 		<div>
	// 			<Reviews reviews={reviews} hotelId={params.id} />
	// 		</div>
	// 	</div>
	// );
};
