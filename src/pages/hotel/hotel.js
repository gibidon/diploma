import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadHotelAsync } from '../../actions/load-hotel-async';
import { useServerRequest } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotel } from '../../selectors';

export const Hotel = () => {
	// const [hotel, setHotel] = useState();
	const params = useParams();
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const hotel = useSelector(selectHotel);

	useEffect(() => {
		dispatch(loadHotelAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	return (
		<div>
			<h2>Post: </h2>
			<div>
				{hotel.id},{hotel.title}
				{hotel.description}
				<img
					src="https://cf.bstatic.com/xdata/images/hotel/square600/121402222.webp?k=f7f266ab09f90ddea4464309eca14d79429afe4218ced6887cb52f82c42c03dc&o="
					alt={hotel.title}
				/>
			</div>
		</div>
	);
};
