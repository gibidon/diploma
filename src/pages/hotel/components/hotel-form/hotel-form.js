import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { saveHotelAsync, removeHotelAsync } from '#actions';
import { useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, EditableInput } from '#components';
import { FiSave } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

import styles from './hotel-form.module.css';
// import { Icon, Input } from '../../../../components';

// import { SpecialPanel } from '../special-panel/special-panel';
// import { savePostAsync } from '../../../../actions';

const emptyFormData = {
	title: '',
	description: '',
	price: 0,
	country: '',
	rating: '',
	images: [],
};

export const HotelForm = ({
	hotelData: { id, title, images, description, price, country, rating },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCreating = useMatch('/hotel/create');

	console.log('i', images);

	const [formState, setFormState] = useState({
		title,
		description,
		price,
		country,
		rating,
		// images: images[0],
		images,
	});

	// if we come from hotel-page to url /hotel/edit,form data is taken from hotel. Otherwise we clean the form in useLayoutEffect:
	useLayoutEffect(() => {
		if (!id) setFormState(emptyFormData);
	}, [id]);

	const onSave = () => {
		// const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(saveHotelAsync(id, formState)).then(({ id }) => {
			navigate(`/hotel/${id}`);
			// navigate('/');
		});
	};

	const onDelete = () => {
		dispatch(removeHotelAsync(id)).then(() => {
			navigate('/');
		});
	};

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	const onImageChange = (index, imageUrl) => {
		const newformState = { ...formState };
		console.log(newformState);
		newformState.images[index] = imageUrl;
		setFormState(newformState);

		// setFormState({
		// 	...formState,
		// 	['images']: formState.images.map((image, i) => {
		// 		i === index ? target.value : imageUrl;
		// 	}),
		// });
	};

	return (
		<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
			<h1>Данные отеля:</h1>
			<div>
				<Input
					name="title"
					value={formState.title}
					placeholder="Название отеля.."
					onChange={onChange}
				/>
			</div>

			<div>
				<textarea
					name="description"
					value={formState.description}
					placeholder="Описание.."
					className={styles.textarea}
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
			<div className={styles.images}>
				<h3>Image urls:</h3>
				<hr />
				{images.map((image, index) => (
					// <EditableInput key={index} id={index} label={index} value={image} />
					<input
						key={index}
						id={index}
						label={index}
						value={image}
						onChange={({ target }) => onImageChange(index, target.value)}
					/>
				))}
			</div>
			<button className={styles.saveBtn}>
				<FiSave size="21px" margin="0 10px 0 0" onClick={onSave} />
			</button>
			{!isCreating && (
				<button className={styles.deleteBtn}>
					<MdDeleteOutline size="21px" margin="0 10px 0 0" onClick={onDelete} />
				</button>
			)}

			{/* <button className={styles.deleteBtn}>
				<MdDeleteOutline size="21px" margin="0 10px 0 0" onClick={onDelete} />
			</button> */}
		</form>
	);
};
