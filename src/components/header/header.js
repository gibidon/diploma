import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themes';
import { ControlPanel, Logo, ToggleSwitch } from './components';
// import { useMatch } from 'react-router-dom';
import styles from './header.module.css';

export const Header = () => {
	// const isMainPage = useMatch('/');
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<div className={styles.main}>
			<div className={styles.headerContent}>
				<Logo />
				<ToggleSwitch toggleTheme={toggleTheme} />
				<ControlPanel />
				{/* {isMainPage && <HeaderSearch />} */}
			</div>
		</div>
	);
};
