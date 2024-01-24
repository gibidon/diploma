import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '#actions';
import { Authorization, Home, Hotel, Registration, UserPage } from '#pages';
import { Container, Header, Footer, Modal } from '#components';
import { AdminPage } from '#pages/admin-page/admin-page';
import './App.css';

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
		);
	}, [dispatch]);

	return (
		<>
			<Header />
			<Container maxWidth={1168} marginTop={'20px'}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/hotel/:id" element={<Hotel />} />
					<Route path="/hotel/create" element={<Hotel />} />
					<Route path="/hotel/:id/edit" element={<Hotel />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/user/:id" element={<UserPage />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>

				<Modal />
			</Container>
			<Footer />
		</>
	);
};
