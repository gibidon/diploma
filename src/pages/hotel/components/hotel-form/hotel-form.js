import { useState, useRef, useLayoutEffect } from 'react';
import { saveHotelAsync } from '#actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '#components';
import { FiSave } from 'react-icons/fi';
import styles from './hotel-form.module.css';
// import { Icon, Input } from '../../../../components';

// import { SpecialPanel } from '../special-panel/special-panel';
// import { savePostAsync } from '../../../../actions';
import { sanitizeContent } from '#utils';

export const HotelForm = ({
	hotelData: { id, title, images, description, price, country, rating },
}) => {
	const contentRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const [imageUrlValue, setImageUrlValue] = useState(images[0]);
	// const [titleValue, setTitleValue] = useState(title);

	const [formState, setFormState] = useState({
		title,
		description,
		price,
		country,
		rating,
		images: images[0],
	});

	console.log('formState: ', formState);
	// useLayoutEffect(() => {
	// 	setImageUrlValue(imageUrl);
	// 	setTitleValue(title);
	// }, [imageUrl, title]);

	const onSave = () => {
		// const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(saveHotelAsync(id, formState)).then(({ id }) => {
			navigate(`/hotel/${id}`);
		});
	};

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	return (
		<form className={styles.form} onSubmit={onSave}>
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

			<button type="submit" className={styles.saveBtn}>
				<FiSave
					size="21px"
					// className={styles.saveBtn}
					margin="0 10px 0 0"
					onClick={onSave}
				/>
			</button>
			{/* <div
				className="post-text"
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
			></div> */}
		</form>
	);
};
