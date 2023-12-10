import { generateDate } from '../utils/generate-date';

export const addUser = async (login, password) =>
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registeredAt: generateDate(),
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
