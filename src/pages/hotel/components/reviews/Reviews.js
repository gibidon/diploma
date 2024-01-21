import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { addReviewAsync } from '#actions';
import { ROLES } from '#constants';
import { Review } from './review';
import styles from './reviews.module.css';

export const Reviews = ({ reviews, hotelId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const isGuest = userRole === ROLES.GUEST;

	const onNewReviewAdd = (hotelId, content) => {
		dispatch(addReviewAsync(hotelId, content));
		setNewComment('');
	};

	return (
		<div className={styles.reviews}>
			<div className={styles.header}>Reviews:</div>
			{reviews.map((review) => (
				<Review
					key={review._id}
					content={review.content}
					author={review.author.login}
					reviewId={review._id}
					hotelId={hotelId}
				/>
			))}

			{!isGuest && (
				<div className="new-comment">
					<textarea
						value={newComment}
						name="comment"
						placeholder="Комментарии.."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<button
						id="fa-paper-plane-o"
						margin=" 0 0 0 10px"
						size="18px"
						onClick={() => onNewReviewAdd(hotelId, newComment)}
					>
						add review
					</button>
				</div>
			)}
		</div>
	);
};
