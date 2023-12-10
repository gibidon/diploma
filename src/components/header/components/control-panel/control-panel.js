import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { ROLES } from '../../../../constants/roles';
import { ROLES } from '#constants/roles';
// import {
// 	selectUserRole,
// 	selectUserLogin,
// 	selectUserSession,
// } from '../../../../selectors';
import { selectUserRole, selectUserLogin, selectUserSession } from '#selectors';
import { logout } from '#actions';
import { Button } from '../../../button/button';
import { FaUser } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import styles from './control-panel.module.scss';

export const ControlPanel = () => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();
	// const navigate = useNavigate();

	console.log('rendering control panel,data: ', login, roleId, session);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	// const isAdmin = checkAccess([ROLES.ADMIN],roleId)

	return (
		<div className={styles.info}>
			{roleId === ROLES.GUEST ? (
				<Link to="/login">
					{/* <Button> */}
					<FaUser
						className={styles.loginIcon}
						// style={{ color: 'white', fontSize: '24px' }}
					/>
					{/* </Button> */}
				</Link>
			) : (
				<>
					<div>Hello, {login}</div>
					{/* <button onClick={onLogout}> */}
					<IoLogOutOutline
						className={styles.logoutIcon}
						onClick={onLogout}
						style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}
					/>
					{/* </button> */}
				</>
			)}
		</div>
	);
};
