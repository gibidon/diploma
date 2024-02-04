import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole, selectUserId } from '#selectors';
import { ROLES } from '#constants';
import { PrivateContent } from '#components';
import { Slider } from '../slider/Slider';
import { Reviews } from '../reviews/Reviews';
import { BookingForm } from '../booking-form/booking-form';
import { CiEdit } from 'react-icons/ci';
import { request } from '#utils';
import styles from './hotel-content.module.css';

export const HotelContent = ({ hotelData }) => {
	console.log('hdata', hotelData);
	const [showBookingForm, setShowBookingForm] = useState(false);
	const formRef = useRef(null);

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
		await request(`/users/${userId}/reservations`, 'POST', {
			...formData,
			['user']: userId,
			['hotel']: hotelId,
			// userId,
			// hotelId,
		});

		setShowBookingForm(!showBookingForm);
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
								<span className={styles.editPanel}>Edit this hotel</span>
								<CiEdit />
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
							setShowBookingForm(!showBookingForm);
							formRef.current?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						Book now
					</button>
				</div>
			</div>
			<div ref={formRef}>
				{showBookingForm && (
					<BookingForm
						submitForm={submitForm}
						cancelForm={() => setShowBookingForm(!showBookingForm)}
					/>
				)}
			</div>

			<Reviews reviews={reviews} hotelId={hotelId} />
		</>
	);
};
