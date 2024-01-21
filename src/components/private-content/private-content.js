import { useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { checkAccess } from '#utils';

export const PrivateContent = ({
	children,
	accessRoles,
	serverError = null,
}) => {
	const userRole = useSelector(selectUserRole);

	console.log('access and userRole before check ', accessRoles, userRole);

	const accessError = checkAccess(accessRoles, userRole)
		? null
		: 'ERROR.ACCESS_DENIED';

	console.log('access error: ', accessError);
	const error = accessError || serverError;

	return error ? error : children;
};
