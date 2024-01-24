import { useState } from 'react';
import { useDebouncedFunction, useDownloadHotels } from '#hooks';
import { HotelCard, FilterColumn } from './components';
import { PAGINATION_LIMIT } from '#constants';
import styles from './home.module.css';

export const Home = () => {
	// const [shouldSearch, setShouldSearch] = useState(false);

	const [searchParams, setSearchParams] = useState({
		searchPhrase: '',
		page: 1,
		PAGINATION_LIMIT,
		country: '',
		price: null,
	});

	// console.log('sp: ', searchParams);
	//TODO with useApi hook and context

	// const { hotels, lastPage } = useDownloadHotels(
	// 	searchPhrase,
	// 	page,
	// 	PAGINATION_LIMIT,
	// );
	const { hotels, lastPage } = useDownloadHotels(
		searchParams.searchPhrase,
		searchParams.page,
		searchParams.PAGINATION_LIMIT,
		searchParams.country,
		searchParams.price,
	);

	console.log('hotels on main: ', hotels);

	const debouncedSearch = useDebouncedFunction(setSearchParams, 700);

	const onChange = (e) => {
		debouncedSearch({ ...searchParams, [e.target.name]: e.target.value });
		// debouncedSearch(!shouldSearch);
	};

	return (
		<div className={styles.home}>
			<FilterColumn onChange={onChange} />
			<div className={styles.content}>
				{hotels.map(({ title, id, images, price }) => (
					<HotelCard
						key={id}
						id={id}
						title={title}
						images={images}
						price={price}
					/>
				))}
			</div>
		</div>
	);
};
