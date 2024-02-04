import { Input } from '#components';
import { useThemeContext } from '#hooks';
import { MultiRangeSlider } from './components/multi-range-slider';
import styles from './search-column.module.css';

// const countryOptions = [
// 	{ value: 'Thailand', label: 'Thailand' },
// 	{ value: 'Cyprus', label: 'Cyprus' },
// 	{ value: 'Vietban', label: 'Vietnam' },
// ];

export const SearchColumn = ({
	searchPhrase,
	country,
	min,
	max,
	onChange,
	cleanSearchParams,
	// onSelectChange,
}) => {
	const { theme } = useThemeContext();

	return (
		<div
			className={
				theme === 'light' ? styles.searchColumn : styles.searchColumnDark
			}
		>
			<h1>Search by:</h1>
			<div>
				<label htmlFor="searchPhrase">Title:</label>
				<Input
					type="text"
					id="searchPhrase"
					name="searchPhrase"
					value={searchPhrase}
					onChange={onChange}
				/>
			</div>

			<div>
				<label>
					Country:
					<select onChange={onChange} name="country" className={styles.select}>
						<option value=""></option>
						<option value="Thailand">Thailand</option>
						<option value="Cyprus">Cyprus</option>
						<option value="Vietnam">Vietnam</option>
						<option value="Maurituis">Mauritius</option>
						<option value="Canarians">Canarians</option>
						<option value="Egypt">Egypt</option>
						<option value="Turkey">Turkey</option>
					</select>
				</label>
			</div>
			<div>
				<label htmlFor="min">Minimum price per night:</label>
				<Input
					type="number"
					id="min"
					name="min"
					value={min}
					onChange={onChange}
					step="50"
				/>
			</div>
			<div>
				<label htmlFor="max">Maximum price per night:</label>
				<Input
					type="number"
					id="max"
					name="max"
					value={max}
					onChange={onChange}
					step="50"
				/>
			</div>
			<div>
				<button onClick={cleanSearchParams}>reset</button>
			</div>
			{/* <MultiRangeSlider min={min} max={max} onChange={onChange} /> */}
			{/* <label htmlFor="room">Sort by room number:</label>
			<Input type="text" id="room" /> */}
		</div>
	);
};
