import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserLogin } from '#selectors';
import { useFetch, useApi, useLoading } from '#hooks';
import { request } from '#utils';
import { useParams } from 'react-router-dom';
import { Loader } from '#components';
import { BookingTemplate } from './components/booking-template';
import styles from './user-page.module.css';

export const UserPage = () => {
	const params = useParams();
	const [shouldUpdate, setShouldUpdate] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const userId = useSelector(selectUserId);
	const userLogin = useSelector(selectUserLogin);

	const { loading, setLoading } = useLoading();

	// const { data, error } = useFetch(`/users/${params.id}/reservations`);

	const updatePage = () => {
		setShouldUpdate(!shouldUpdate);
	};

	useEffect(() => {
		setLoading(true);

		request(`/users/${params.id}/reservations`)
			.then((data) => {
				setData(data);
			})
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, [params.id, shouldUpdate]);

	if (loading) return <Loader />;

	return (
		<>
			{error ? (
				<div>Error loading data</div>
			) : (
				<div>
					{data.length >= 1 ? (
						<div className={styles.userPage}>
							<h1>My bookings: </h1>

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
										updatePage={updatePage}
									/>
								))}
							</div>
						</div>
					) : (
						<div>You have no bookings yet</div>
					)}
				</div>
			)}
		</>
	);
};
