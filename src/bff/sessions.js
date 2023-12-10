import { addSession, getSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);
		addSession(hash, user);
		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}
		deleteSession(session.id);
	},
};
