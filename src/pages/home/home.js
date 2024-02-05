import { useEffect, useState } from 'react';
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

const initialSearchParams = {
	searchPhrase: '',
	page: 1,
	PAGINATION_LIMIT,
	country: '',
	min: 1,
	max: 1000,
	rating: null,
};

export const Home = () => {
	// const [hotels, setHotels] = useState([]);
	const [searchParams, setSearchParams] = useState(initialSearchParams);

	console.log('sp', searchParams);

	const { loading, setLoading } = useLoading();

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

	// useEffect only to make initial load:

	// const loadHotels = async (
	// 	searchPhrase,
	// 	page,
	// 	PAGINATION_LIMIT,
	// 	country,
	// 	min,
	// 	max,
	// ) => {
	// 	console.log(searchPhrase, country, min, max);
	// 	setLoading(true);

	// 	const response = await fetch(
	// 		`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}`,
	// 	);
	// 	const { hotels } = await response.json();
	// 	console.log(hotels);

	// 	setHotels(hotels);
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	loadHotels(searchPhrase, page, PAGINATION_LIMIT, country, min, max);
	// }, []);

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

	const debouncedSearch = useDebouncedFunction(setSearchParams, DEBOUNCE_DELAY);
	// const debouncedLoadHotels = useDebouncedFunction(loadHotels, DEBOUNCE_DELAY);

	const onChange = (e) => {
		debouncedSearch({
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

	const cleanSearchParams = () => {
		setSearchParams(initialSearchParams);
	};
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
					cleanSearchParams={cleanSearchParams}
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
