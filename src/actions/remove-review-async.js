import { request } from '#utils';
import { removeReview } from './remove-review';

export const removeReviewAsync = (hotelId, reviewId) => (dispatch) => {
	console.log('in remove reviewasync: ', hotelId, reviewId);
	request(`/hotels/${hotelId}/reviews/${reviewId}`, 'DELETE').then(() => {
		dispatch(removeReview(reviewId));
	});
};
