import { request } from '#utils';
import { addReview } from './add-review';

export const addReviewAsync = (hotelId, content) => (dispatch) => {
	request(`/hotels/${hotelId}/reviews`, 'POST', { content }).then((review) => {
		console.log('reviewData', review.data);
		dispatch(addReview(review.data));
	});
};
