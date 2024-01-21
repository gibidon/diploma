import { Slider } from '../slider/Slider';
import { Reviews } from '../reviews/Reviews';
import styles from './hotel-content.module.css';

export const HotelContent = ({ hotelData }) => {
	console.log('hdd:', hotelData);

	const {
		id: hotelId,
		title,
		images,
		country,
		reviews,
		description,
		price,
	} = hotelData;

	return (
		<>
			<h1>{title} &#9733;</h1>
			<div className={styles.content}>
				<Slider images={images} />
				<div className={styles.description}>
					<span className={styles.description_country}>Country: {country}</span>
					{description}
					<span className={styles.description_price}>
						Price: {price} $ per night
					</span>

					<button
						className={styles.bookBtn}
						// onClick={() => book(userLogin, params.id)}
						onClick={() => console.log('booking!')}
					>
						Book now
					</button>
				</div>
			</div>
			<div>
				<Reviews reviews={reviews} hotelId={hotelId} />
			</div>
		</>
	);
};
