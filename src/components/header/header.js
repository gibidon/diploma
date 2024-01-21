import { ControlPanel, HeaderSearch, Logo } from './components';
import { useMatch } from 'react-router-dom';
import styles from './header.module.scss';

export const Header = () => {
	const isMainPage = useMatch('/');

	return (
		<div className={styles.main}>
			<div className={styles.headerContent}>
				<Logo />
				<ControlPanel />
				{/* {isMainPage && <HeaderSearch />} */}
			</div>
		</div>
	);
};
