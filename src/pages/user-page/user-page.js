import { useSelector } from 'react-redux';
import { selectUserId, selectUserLogin } from '#selectors';
import { useFetch } from '#hooks';
import { request } from '#utils';
import { useParams } from 'react-router-dom';
import { BookingTemplate } from './components/booking-template';
import styles from './user-page.module.css';

export const UserPage = () => {
	const params = useParams();
	const userId = useSelector(selectUserId);
	const userLogin = useSelector(selectUserLogin);

	const { data } = useFetch(`/users/${params.id}/reservations`);

	console.log('data in userPage', data, typeof data);

	return (
		<div className={styles.userPage}>
			<h1>My bookings: </h1>
			<div className={styles.userInfo}>
				<div>Login: {userLogin}</div>
			</div>
			<div className={styles.bookings}>
				{data.map(({ id, user, checkIn, checkOut, guests, hotel }) => (
					<BookingTemplate
						key={id}
						id={id}
						userLogin={user.login}
						checkIn={checkIn}
						checkOut={checkOut}
						guests={guests}
						hotel={hotel}
					/>
				))}
			</div>
		</div>
	);
};
