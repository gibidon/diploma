import { useState } from 'react';
import { Input } from '#components';
import { TiTickOutline } from 'react-icons/ti';
import styles from './booking-form.module.css';

export const BookingForm = ({ submitForm, cancelForm }) => {
	const [formState, setFormState] = useState({
		dateStart: '',
		dateEnd: '',
		guestQuantity: null,
	});

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	return (
		<form className={styles.form} onSubmit={(e) => e.stopPropagation()}>
			<h1 className={styles.title}>Пожалуйста заполните детали поездки:</h1>
			<div>
				<Input
					name="dateStart"
					value={formState.dateStart}
					placeholder="Дата заезда.."
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="dateEnd"
					value={formState.dateEnd}
					placeholder="Дата выезда.."
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="guestQuantity"
					value={formState.guestNumber}
					placeholder="Количество гостей.."
					onChange={onChange}
				/>
			</div>
			<div className={styles.buttons}>
				<button className={styles.sendFormBtn} type="button">
					<TiTickOutline
						size="21px"
						margin="0 10px 0 0"
						onClick={() => submitForm(formState)}
					/>
				</button>

				<button className={styles.cancelFormBtn} onClick={() => cancelForm()}>
					Cancel
				</button>
			</div>
		</form>
	);
};
