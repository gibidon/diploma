import { Link } from 'react-router-dom';
import styles from './hotel-card.module.css';

export const HotelCard = ({ id, title, images: imageUrls }) => {
	return (
		<Link to={`/hotel/${id}`}>
			<div className={styles.card}>
				<div className={styles.title}>{title}</div>

				{/* showing only the first image */}
				<img src={imageUrls[0]} alt={imageUrls[0].title} />
			</div>
		</Link>
	);
};
