import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import styles from './hotel-card.module.scss';

export const HotelCard = ({ id, title, images }) => {
	return (
		<Link to={`/hotels/${id}`}>
			<div className={styles.card}>
				<div>
					<strong>{title}</strong>
				</div>
				<br />
				{/* {images.map((image, index) => (
					<img src={image} alt={image} key={index} />
				))} */}
				{<img src={images[0]} alt={images[0]} />}
				{/* <p>Great one</p> */}
				<Button className={styles.bookButton}>View</Button>
			</div>
		</Link>
	);
};
