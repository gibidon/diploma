import { useState, useEffect } from 'react';
import { BoldText, Loader, Dropdown, PrivateContent } from '#components';
import { useSelector } from 'react-redux';
import { ROLES } from '#constants';
import { useApi, useLoading } from '#hooks';
import { selectUserRole } from '#selectors';
import { checkAccess, request } from '#utils';
import styles from './admin-page.module.css';

export const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [hotels, setHotels] = useState([]);
	// const [reservations, setReservations] = useState([]);
	const [shouldUpdateData, setShouldUpdateData] = useState(false);
	const userRole = useSelector(selectUserRole);
	const { loading, setLoading } = useLoading();

	console.log('uh', users, hotels);

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}
		setLoading(true);
		Promise.all([
			request('/users'),
			request('/hotels'),
			// request('/reservations'),
		]).then(([{ users }, { hotels }]) => {
			setUsers(users);
			setHotels(hotels);
			// setReservations(reservations);
			setLoading(false);
		});
	}, [shouldUpdateData, setLoading, userRole]);

	const deleteUser = (id) => {
		request(`/users/${id}`, 'DELETE').then(
			setShouldUpdateData(!shouldUpdateData),
			// TODO delete user's bookings and reviews
		);
	};

	if (loading) return <Loader />;

	return (
		<PrivateContent accessRoles={[ROLES.ADMIN]}>
			<h1>Admin page</h1>

			<div className={styles.userList}>
				<h2>User list: </h2>
				{users.map(({ id, login, reservations }, index) => (
					<div className={styles.user} key={index}>
						<BoldText>User login : {login} </BoldText>
						<Dropdown openBtnText={'More info'} closeBtnText={'Hide'}>
							<div>id: {id}</div>
							<div>Login: {login}</div>
							<div>
								Reservations:
								{reservations.map((reservation, index) => (
									<div key={index}>{reservation}</div>
								))}
							</div>
							<div>
								<button onClick={() => deleteUser(id)}>Delete user</button>
							</div>
						</Dropdown>
					</div>
				))}
			</div>
			<div className={styles.hotelList}>
				<h2>Hotel list:</h2>

				{hotels.map(({ id, title }) => (
					<div>
						Id:{id},title:{title}
					</div>
				))}
			</div>
			{/* <div className={styles.reservations}> */}
			{/* {reservations.map((reservation) => (
					<div>reservation.id</div>
				))} */}
			{/* </div> */}
		</PrivateContent>
	);
};

// Promise.all([request('/users'), request('/users/roles')]).then(([usersRes, rolesRes]) => {
// 		if (usersRes.error || rolesRes.error) {
// 			setErrorMessage(usersRes.error || rolesRes.error);
// 			return;
// 		}

// 		setUsers(usersRes.data);
// 		setRoles(rolesRes.data);
// 	});
// }, [shouldUpdateUserList, userRole]);

// -------------------------------------------------------

// useEffect(() => {
// 		if (!checkAccess([ROLE.ADMIN], userRole)) {
// 			return;
// 		}

// 		Promise.all([request('/users'), request('/users/roles')]).then(([usersRes, rolesRes]) => {
// 			if (usersRes.error || rolesRes.error) {
// 				setErrorMessage(usersRes.error || rolesRes.error);
// 				return;
// 			}

// 			setUsers(usersRes.data);
// 			setRoles(rolesRes.data);
// 		});
// 	}, [shouldUpdateUserList, userRole]);

// 	const onUserRemove = (userId) => {
// 		if (!checkAccess([ROLE.ADMIN], userRole)) {
// 			return;
// 		}

// 		request(`/users/${userId}`, 'DELETE').then(setShouldUpdateUserList(!shouldUpdateUserList));
// 	};

// 	return (
// 		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
// 			<div className={className}>
// 				<H2> Пользователи</H2>
// 				<div>
// 					<TableRow>
// 						<div className="login-column">Логин</div>
// 						<div className="registered-at-column">Дата регистрации</div>
// 						<div className="role-column">Роль</div>
// 					</TableRow>

// 					{users.map(({ id, login, registeredAt, roleId }) => (
// 						<UserRow
// 							key={id}
// 							id={id}
// 							login={login}
// 							registeredAt={registeredAt}
// 							roleId={roleId}
// 							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
// 							onUserRemove={() => onUserRemove(id)}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</PrivateContent>
// 	);
// };
