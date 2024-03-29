import { ACTION_TYPE } from '#actions';
import { ROLES } from '#constants';

const initialUserState = {
	id: null,
	login: null,
	session: null,
	roleId: ROLES.GUEST,
};

export const userReducer = (state = initialUserState, action) => {
	// console.log('state in store: ', state);
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};

		case ACTION_TYPE.LOGOUT:
			return initialUserState;

		default:
			return state;
	}
};
