import { useState } from 'react';
import { Input } from '#components';
import { IoCheckmark } from 'react-icons/io5';
import styles from './booking-form.module.css';

export const BookingForm = ({ submitForm, cancelForm }) => {
	const [formState, setFormState] = useState({
		checkIn: '',
		checkOut: '',
		guestQuantity: null,
	});

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	return (
		<form className={styles.form} onSubmit={(e) => e.stopPropagation()}>
			<h1 className={styles.title}>Пожалуйста, заполните детали поездки:</h1>
			<div>
				<Input
					name="checkIn"
					value={formState.checkIn}
					placeholder="Дата заезда yyyy--mm-dd"
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="checkOut"
					value={formState.checkOut}
					placeholder="Дата выезда yyyy-mm-dd"
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="guestQuantity"
					value={formState.guestQuantity}
					placeholder="Количество гостей.."
					onChange={onChange}
				/>
			</div>
			<div className={styles.buttons}>
				<button
					className={styles.sendFormBtn}
					type="button"
					onClick={() => submitForm(formState)}
				>
					<IoCheckmark size="20px" />
				</button>

				<button className={styles.cancelFormBtn} onClick={() => cancelForm()}>
					Cancel
				</button>
			</div>
		</form>
	);
};
