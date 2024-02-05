import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { addReviewAsync } from '#actions';
import { ROLES } from '#constants';
import { Review } from './review';
import styles from './reviews.module.css';

export const Reviews = ({ reviews, hotelId }) => {
	console.log('reviews: ', reviews);
	const [newReview, setNewReview] = useState('');

	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const isGuest = userRole === ROLES.GUEST;

	const onNewReviewAdd = (hotelId, newReview) => {
		dispatch(addReviewAsync(hotelId, newReview));
		setNewReview('');
	};

	return (
		<div className={styles.reviews}>
			<div className={styles.header}>Reviews:</div>
			{/* {reviews.map((review) => (
				<Review
					key={review._id}
					content={review.content}
					author={review.author.login}
					reviewId={review._id}
					hotelId={hotelId}
				/>
			))} */}
			{reviews.map(({ _id, content, author, _reviewId, hotelId }) => (
				<Review
					key={_id}
					content={content}
					author={author.login}
					reviewId={_reviewId}
					hotelId={hotelId}
				/>
			))}

			{!isGuest && (
				<div className={styles.newComment}>
					<textarea
						className={styles.textarea}
						value={newReview}
						name="comment"
						placeholder="Добавить отзыв.."
						onChange={({ target }) => {
							setNewReview(target.value);
						}}
					></textarea>

					<button
						className={styles.addBtn}
						onClick={() => onNewReviewAdd(hotelId, newReview)}
					>
						add review
					</button>
				</div>
			)}
		</div>
	);
};
