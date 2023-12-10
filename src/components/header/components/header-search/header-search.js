import { useState } from 'react';
import { FaBed } from 'react-icons/fa6';
import { CiCalendar } from 'react-icons/ci';
import { BsPersonStanding } from 'react-icons/bs';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import styles from './header-search.module.css';

export const HeaderSearch = () => {
	const [openDate, setOpenDate] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	return (
		<div className={styles.headerSearch}>
			<div className={styles.headerSearchItem}>
				<FaBed />
				<input
					type="text"
					placeholder="where are you going?"
					className={styles.headerSearchInput}
				/>
			</div>
			<div className={styles.headerSearchItem}>
				<CiCalendar />
				<span
					onClick={() => setOpenDate(!openDate)}
					className={styles.headerSearchText}
				>{`${format(date[0].startDate, 'MM//dd/yyyy')} to ${format(
					date[0].startDate,
					'MM//dd/yyyy',
				)}`}</span>
				{openDate && (
					<DateRange
						editableDateInputs={true}
						onChange={(item) => setDate([item.selection])}
						moveRangeOnFirstSelection={false}
						ranges={date}
						className={styles.date}
					/>
				)}
			</div>
			<div className={styles.headerSearchItem}>
				<BsPersonStanding />
				<span className={styles.headerSearchText}>
					{`${options.adult} adult | ${options.children} children | ${options.room} room`}
					<div className={styles.options}>
						<div className={styles.optionItem}>
							<span className={styles.optionText}>Adult</span>
							<div className={styles.optionCounter}>
								<button className={styles.optionCounterButton}>-</button>
								<span className={styles.optionCounterNumber}>1</span>
								<button className={styles.optionCounterButton}>+</button>
							</div>
						</div>
						<div className={styles.optionItem}>
							<span className={styles.optionText}>Children</span>
							<div className={styles.optionCounter}>
								<button className={styles.optionCounterButton}>-</button>
								<span className={styles.optionCounterNumber}>0</span>
								<button className={styles.optionCounterButton}>+</button>
							</div>
						</div>
						<div className={styles.optionItem}>
							<span className={styles.optionText}>Room</span>
							<div className={styles.optionCounter}>
								<button className={styles.optionCounterButton}>-</button>
								<span className={styles.optionCounterNumber}>1</span>
								<button className={styles.optionCounterButton}>+</button>
							</div>
						</div>
					</div>
				</span>
			</div>
			<div className={styles.headerSearchItem}>
				<button className={styles.headerBtn}>Search</button>
			</div>
		</div>
	);
};
