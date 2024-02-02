import { useState } from 'react';
import {
	useDebouncedFunction,
	useDownloadHotels,
	useApi,
	useLoading,
} from '#hooks';
import { HotelCard, SearchColumn } from './components';
import { DEBOUNCE_DELAY, PAGINATION_LIMIT } from '#constants';
import { BoldText, Loader } from '#components';
import styles from './home.module.css';

export const Home = () => {
	const [searchParams, setSearchParams] = useState({
		searchPhrase: '',
		page: 1,
		PAGINATION_LIMIT,
		country: '',
		min: 1,
		max: 1000,
		rating: null,
	});

	const { loading } = useLoading();

	const { searchPhrase, page, country, min, max, rating } = searchParams;

	// const { hotels, lastPage } = useDownloadHotels(
	// 	searchParams.searchPhrase,
	// 	searchParams.page,
	// 	searchParams.PAGINATION_LIMIT,
	// 	searchParams.country,
	// 	searchParams.min,
	// 	searchParams.max,
	// 	searchParams.rating,
	// );

	const { data } = useApi(
		'hotels.all',
		searchPhrase,
		page,
		PAGINATION_LIMIT,
		country,
		min,
		max,
	);
	const { hotels, lastPage } = data;

	const debouncedSearchByParams = useDebouncedFunction(
		setSearchParams,
		DEBOUNCE_DELAY,
	);

	const onChange = (e) => {
		debouncedSearchByParams({
			...searchParams,
			[e.target.name]: e.target.value,
		});
	};

	// const onChange = (e) => {
	// 	setSearchParams({
	// 		...searchParams,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	// if (loading) return <Loader />;

	return (
		<>
			<div className={styles.home}>
				<SearchColumn
					searchPhrase={searchPhrase}
					country={country}
					min={min}
					max={max}
					onChange={onChange}
				/>
				<div className={styles.content}>
					{loading && <Loader />}

					{hotels?.length >= 1 ? (
						hotels.map(({ title, id, images, price }) => (
							<HotelCard
								key={id}
								id={id}
								title={title}
								images={images}
								price={price}
							/>
						))
					) : (
						<div>
							<BoldText fontWeight={700}>
								По выбранным критериям не найдено результатов. Пожалуйста,
								уточните параметры поиска
							</BoldText>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
