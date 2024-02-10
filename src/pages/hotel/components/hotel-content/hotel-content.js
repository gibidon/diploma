import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole, selectUserId } from '#selectors';
import { ROLES } from '#constants';
import { PrivateContent } from '#components';
import { Slider } from '../slider/Slider';
import { Reviews } from '../reviews/Reviews';
import { BookingForm } from '../booking-form/booking-form';
import { request } from '#utils';
import styles from './hotel-content.module.css';

export const HotelContent = ({ hotelData }) => {
	console.log('rendering hotel content..');
	const [showReservationForm, setShowReservationForm] = useState(false);
	const [error, setError] = useState('');
	const formRef = useRef('');

	const {
		id: hotelId,
		title,
		images,
		country,
		reviews,
		description,
		price,
		rating,
	} = hotelData;

	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const isLogged = userRole !== ROLES.GUEST;
	const isAdmin = userRole === ROLES.ADMIN;

	const submitReservationForm = async (formData) => {
		//TODO change user and hotel to userId and hotel,difference with DB storing
		try {
			const { error } = await request(`/users/${userId}/reservations`, 'POST', {
				...formData,
				user: userId,
				hotel: hotelId,
			});

			if (error) setError(error);
		} catch (error) {
			throw new Error('Something wrong happened when submitting form..');
		}

		setShowReservationForm(!showReservationForm);
	};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.leftAligned}>
					<h1>{title}</h1>
					<span className={styles.stars}>
						{[...Array(Number(rating))].map((star, index) => (
							<span key={index} className={styles.rating}>
								&#9733;
							</span>
						))}
					</span>
				</div>
				<div className={styles.rightAligned}>
					{isAdmin && (
						<PrivateContent accessRoles={[ROLES.ADMIN]}>
							<Link to={`/hotel/${hotelId}/edit`}>
								<span className={styles.editPanel}>Edit hotel</span>
							</Link>
						</PrivateContent>
					)}
				</div>
			</div>

			<div className={styles.content}>
				<Slider images={images} />
				<div className={styles.description}>
					<span className={styles.description_country}>Country: {country}</span>
					{description}
					<span className={styles.description_price}>
						Price: {price} $ per night
					</span>

					<button
						className={isLogged ? styles.bookBtn : styles.bookBtnDisabled}
						disabled={!isLogged}
						onClick={() => {
							setShowReservationForm(!showReservationForm);
							formRef.current?.scrollIntoView({ behavior: 'smooth' });
							setError('');
						}}
					>
						Book now
					</button>
				</div>
			</div>
			<div className={styles.errorMessage}>
				{error && <div>Error: {error}</div>}
			</div>

			<div ref={formRef}>
				{showReservationForm && (
					<BookingForm
						submitForm={submitReservationForm}
						cancelForm={() => setShowReservationForm(!showReservationForm)}
					/>
				)}
			</div>
			<Reviews reviews={reviews} hotelId={hotelId} />
		</>
	);
};
