import { useState } from 'react';
import { request } from '#utils';
import { useLoading } from '#hooks';
import { EditableInput, Loader } from '#components';

import styles from './booking-template.module.css';

export const BookingTemplate = ({
	id,
	userLogin,
	checkIn,
	checkOut,
	guests,
	hotel,
	updatePage,
}) => {
	const [formState, setFormState] = useState({
		id,
		userLogin,
		checkIn,
		checkOut,
		guests,
		hotel,
	});

	const { loading, setLoading } = useLoading();
	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	const updateReservation = (id) => {
		setLoading(true);

		request(`/reservations/${id}`, 'PATCH', {
			dateStart: formState.checkIn,
			dateEnd: formState.checkOut,
			guestQuantity: formState.guests,
		})
			.then(updatePage)
			.then(setLoading(false));
	};

	const deleteReservation = (id) => {
		setLoading(true);

		request(`/reservations/${id}/hotels/${hotel}`, 'DELETE')
			.then(updatePage())
			.then(setLoading(false));
	};

	if (loading) return <Loader />;

	return (
		<div className={styles.template}>
			<div>Booking id: {id}</div>
			<div>User: {userLogin}</div>
			<div>
				<EditableInput
					id={'check-in'}
					label={'Check-in date:'}
					type={'text'}
					value={formState.checkIn}
					name={'checkIn'}
					onChange={onChange}
				/>
			</div>
			<div>
				<EditableInput
					id={'check-out'}
					label={'Check-out date:'}
					type={'text'}
					value={formState.checkOut}
					name={'checkOut'}
					onChange={onChange}
				/>
			</div>

			<div>
				<EditableInput
					id={'guests'}
					label={'Guest quantity:'}
					type={'number'}
					value={formState.guests}
					name={'guests'}
					onChange={onChange}
				/>
			</div>
			<div>Hotel: {hotel}</div>
			<div className={styles.buttons}>
				<button
					className={styles.removeBtn}
					onClick={() => deleteReservation(id)}
				>
					Delete reservation
				</button>
				<button
					className={styles.updateBtn}
					onClick={() => updateReservation(id)}
				>
					Update reservation
				</button>
			</div>
		</div>
	);
};
