import { useDispatch, useSelector } from 'react-redux';
import { removeReviewAsync, openModal, CLOSE_MODAL } from '#actions';
import { selectUserRole } from '#selectors';
import { ROLES } from '#constants';
import styles from './review.module.css';

export const Review = ({ content, author, hotelId, reviewId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const isAdmin = [ROLES.ADMIN].includes(userRole);

	const onDeleteReview = (reviewId) => {
		dispatch(
			openModal({
				text: 'Удалить отзыв?',
				onConfirm: () => {
					dispatch(removeReviewAsync(hotelId, reviewId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<div className={styles.review}>
			<div>Content: {content}</div>
			<div className={styles.author}> Author: {author}</div>
			{isAdmin && (
				<button onClick={() => onDeleteReview(reviewId)}>Delete</button>
			)}
		</div>
	);
};
