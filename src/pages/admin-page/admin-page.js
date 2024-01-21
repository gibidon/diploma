import { useEffect, useState } from 'react';
import { PrivateContent } from '../../components';
// import { useServerRequest } from '../../hooks';
import { useSelector } from 'react-redux';
import { ROLES } from '../../constants/roles';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils/check-access';
import styles from './admin-page.module.css';

export const AdminPage = () => {
	const [hotels, setHotels] = useState([]);
	const userRole = useSelector(selectUserRole);

	// const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}

		// requestServer('fetchHotels').then(({ hotels }) => {
		setHotels(hotels);
	});
	// }, [requestServer, userRole]);

	console.log(hotels);

	return (
		<PrivateContent accessRoles={[ROLES.ADMIN]}>
			<div>
				{hotels.map(({ id, title, description, booked }) => (
					<div key={id}>
						{title}: {description} : {booked}
					</div>
				))}
			</div>
		</PrivateContent>
	);
};
