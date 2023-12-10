import { getSession } from './get-session';

export const deleteSession = async (sessionId) => {
	fetch(`http://localhost:3000/sessions/${sessionId}`, {
		method: 'DELETE',
	});
};
