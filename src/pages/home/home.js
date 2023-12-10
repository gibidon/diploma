import { useState, useEffect } from 'react';
import { HotelCard } from './components/hotel-card';
import { Container } from '../../components';
import { fetchHotels } from '../../bff/operations';
import { useDebouncedFunction } from '../../hooks';
import styles from './home.module.scss';

export const Home = () => {
	//downloaded hotels
	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		const loadHotels = () => {
			fetchHotels().then(({ hotels }) => {
				setHotels(hotels);
			});
		};

		loadHotels();
	}, []);
	// const debouncedSearch = useDebouncedFunction()
	return (
		<Container maxWidth={1168}>
			<div className={styles.main}>
				<div className={styles.filterBar}>
					<div>filter by name</div>
					<div>filter by destination</div>
				</div>
				<div className={styles.content}>
					{hotels.map(({ id, title, images }, index) => (
						<HotelCard key={index} id={id} title={title} images={images} />
					))}
				</div>
			</div>
		</Container>
	);
};
