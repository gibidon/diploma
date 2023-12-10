import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (reglogin, regpassword) => {
	const existingUser = await getUser(reglogin);
	console.log('existingUser', existingUser);

	if (existingUser) {
		return { error: 'This login is not available', res: null };
	}

	const createdUser = await addUser(reglogin, regpassword);

	return {
		error: null,
		res: {
			id: createdUser.id,
			login: createdUser.login,
			roleId: createdUser.role_id,
			session: sessions.create(),
		},
	};
};
