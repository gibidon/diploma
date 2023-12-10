import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { Authorization, Home, Hotel, Registration } from './pages';
import { Container, Header, Footer } from './components';
import { AdminPage } from './pages/admin-page/admin-page';
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
			<Container maxWidth={1168}>
				{/* <div> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/hotels/:id" element={<Hotel />} />
					<Route path="/admin-page" element={<AdminPage />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
				{/* </div> */}

				{/* <Modal/> */}
				{/* </div> */}
			</Container>
			<Footer />
		</>

		// <div className="App">
	);
};
