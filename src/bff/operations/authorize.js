import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);
	console.log(user);

	if (!user) {
		return { error: 'user not found', res: null };
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return { error: 'password is incorrect', res: null };
	}

	return {
		error: null,
		res: { id, login, roleId, session: sessions.create(user) },
		// res: { id, login, roleId },
	};
};
