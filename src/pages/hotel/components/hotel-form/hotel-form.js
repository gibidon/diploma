import { useState, useRef, useLayoutEffect } from 'react';
import { saveHotelAsync, removeHotelAsync } from '#actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '#components';
import { FiSave } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './hotel-form.module.css';
// import { Icon, Input } from '../../../../components';

// import { SpecialPanel } from '../special-panel/special-panel';
// import { savePostAsync } from '../../../../actions';
import { sanitizeContent } from '#utils';

const emptyFormData = {
	title: '',
	description: '',
	price: null,
	country: '',
	rating: '',
	images: [],
};

export const HotelForm = ({
	hotelData: { id, title, images, description, price, country, rating },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formState, setFormState] = useState({
		title,
		description,
		price,
		country,
		rating,
		images: images[0],
	});

	console.log('formState: ', formState);

	//if we come from hotel-page to url /hotel/edit,form data is taken from hotel. Otherwise we clean the form in useLayoutEffect:
	useLayoutEffect(() => {
		if (!id) setFormState(emptyFormData);
	}, [id]);

	const onSave = () => {
		// const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(saveHotelAsync(id, formState)).then(({ id }) => {
			// navigate(`/hotel/${id}`);
			navigate('/');
		});
	};

	const onDelete = () => {
		dispatch(removeHotelAsync(id)).then(() => {
			navigate('/');
		});
	};

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	return (
		<form className={styles.form}>
			<h1>Please fill out the form:</h1>
			<div>
				<Input
					name="title"
					value={formState.title}
					placeholder="Название отеля.."
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="description"
					value={formState.description}
					placeholder="Описание.."
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="country"
					value={formState.country}
					placeholder="Введите страну нахождения.."
					onChange={onChange}
				/>
			</div>
			<div>
				<Input
					name="price"
					value={formState.price}
					placeholder="Цена.."
					onChange={onChange}
				/>
			</div>
			<div>
				<Input
					name="rating"
					value={formState.rating}
					placeholder="Рейтинг.."
					onChange={onChange}
				/>
			</div>

			<button className={styles.saveBtn}>
				<FiSave size="21px" margin="0 10px 0 0" onClick={onSave} />
			</button>

			<button className={styles.deleteBtn}>
				<MdDeleteOutline size="21px" margin="0 10px 0 0" onClick={onDelete} />
			</button>
		</form>
	);
};
