import { Input } from '#components';
import styles from './filter-column.module.css';

export const FilterColumn = ({ onChange }) => {
	return (
		<div className={styles.filterColumn}>
			<h1>Search by:</h1>
			<label htmlFor="searchPhrase">Find by title:</label>
			<Input
				type="text"
				id="searchPhrase"
				name="searchPhrase"
				onChange={onChange}
			/>
			<label htmlFor="country">Sort by country:</label>
			<Input type="text" id="country" name="country" onChange={onChange} />
			<label htmlFor="price">Sort by price:</label>
			<Input type="text" id="price" name="price" onChange={onChange} />
			{/* <label htmlFor="room">Sort by room number:</label>
			<Input type="text" id="room" /> */}
		</div>
	);
};
