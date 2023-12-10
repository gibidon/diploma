import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux';
import thunk from 'redux-thunk';
import {
	appReducer,
	hotelReducer,
	hotelsReducer,
	userReducer,
	// usersReducer,
} from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const reducer = combineReducers({
	app: appReducer,
	hotel: hotelReducer,
	hotels: hotelsReducer,
	user: userReducer,
	// users: usersReducer,
});

// export const store = createStore(
// 	reducer,
// 	composeEnhancers(applyMiddleware(thunk)),
// );

export const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk)),
);
