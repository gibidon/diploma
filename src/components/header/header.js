import { Container } from '../container/container';

// import { ControlPanel } from './components/control-panel/control-panel';
import { ControlPanel, HeaderSearch, Logo } from './components';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import styles from './header.module.scss';

export const Header = () => {
	const isMainPage = useMatch('/');

	return (
		<div className={styles.main}>
			<Container maxWidth={1168}>
				<div className={styles.headerContent}>
					<Logo />
					<ControlPanel />
				</div>
				{isMainPage && <HeaderSearch />}
			</Container>
		</div>
	);
};
