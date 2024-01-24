import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Slider } from '../slider/Slider';
import { Reviews } from '../reviews/Reviews';
import { PrivateContent } from '#components';
import { BookingForm } from '../booking-form/booking-form';
import { selectUserRole, selectUserId } from '#selectors';
import { ROLES } from '#constants';
import { CiEdit } from 'react-icons/ci';
import { request } from '#utils';
import styles from './hotel-content.module.css';

export const HotelContent = ({ hotelData }) => {
	const [showBookingForm, setShowBookingForm] = useState(false);
	const formRef = useRef(null);
	// console.log('hdd:', hotelData);

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

	const submitForm = async (formData) => {
		console.log('sumbitting form with fromData: ', formData);

		await request(`/users/${userId}/reservations`, 'POST', {
			...formData,
			['user']: userId,
			['hotel']: hotelId,
		});

		setShowBookingForm(!showBookingForm);
	};

	return (
		<div className={styles.contentPage}>
			<h1>
				{title}
				{[...Array(Number(rating))].map((star, index) => (
					<span key={index} className={styles.rating}>
						&#9733;
					</span>
				))}
				{isAdmin && (
					<PrivateContent accessRoles={[ROLES.ADMIN]}>
						<Link to={`/hotel/${hotelId}/edit`}>
							<CiEdit />
						</Link>
					</PrivateContent>
				)}
			</h1>

			<div className={styles.content}>
				<Slider images={images} />
				<div className={styles.description}>
					<span className={styles.description_country}>Country: {country}</span>
					{description}
					<span className={styles.description_price}>
						Price: {price} $ per night
					</span>

					<button
						className={styles.bookBtn}
						disabled={!isLogged}
						onClick={() => {
							setShowBookingForm(!showBookingForm);
							formRef.current?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						Book now
					</button>
				</div>
			</div>
			{showBookingForm && (
				<BookingForm
					submitForm={submitForm}
					cancelForm={() => setShowBookingForm(!showBookingForm)}
				/>
			)}
			{/* ref is here just because it looks better */}
			<div ref={formRef}>
				<Reviews reviews={reviews} hotelId={hotelId} />
			</div>
		</div>
	);
};
