import { useEffect, useState } from 'react';
import { PrivateContent } from '#components';
import { useSelector } from 'react-redux';
import { ROLES } from '#constants';
import { selectUserRole } from '#selectors';
import { checkAccess, request } from '#utils';
import styles from './admin-page.module.css';

export const AdminPage = () => {
	const [hotels, setHotels] = useState([]);
	const userRole = useSelector(selectUserRole);

	// const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}

		request('/hotels').then(({ hotels }) => {
			setHotels(hotels);
		});
	}, []);

	console.log('hotels', hotels);

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
