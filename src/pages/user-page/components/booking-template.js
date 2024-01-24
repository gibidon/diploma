import styles from './booking-template.module.css';

export const BookingTemplate = ({
	id,
	userLogin,
	checkIn,
	checkOut,
	guests,
	hotel,
}) => {
	return (
		<div className={styles.template} contentEditable={true}>
			<div>Booking id: {id}</div>
			<div>User: {userLogin}</div>
			<div>Check-in: {checkIn}</div>
			<div>Checkout: {checkOut}</div>
			<div>Guests: {guests}</div>
			<div>Hotel: {hotel}</div>
		</div>
	);
};
