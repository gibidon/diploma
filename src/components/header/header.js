import { ControlPanel, Logo, ToggleSwitch } from './components';
import { useThemeContext } from '#hooks';
import styles from './header.module.css';

export const Header = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.main : styles.mainDark}>
			<div className={styles.headerContent}>
				<Logo />
				<div className={styles.rightAligned}>
					<span>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
					<ToggleSwitch toggleTheme={toggleTheme} />
					<ControlPanel />
				</div>
			</div>
		</div>
	);
};
