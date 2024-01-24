import { Link } from 'react-router-dom';
import styles from './hotel-card.module.css';

export const HotelCard = ({ id, images, title }) => {
	return (
		<Link to={`/hotel/${id}`}>
			<div className={styles.card}>
				<div className={styles.title}>{title}</div>
				<img src={images[0]} alt={images[0]} />
			</div>
		</Link>
	);
};
