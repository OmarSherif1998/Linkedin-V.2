/** @format */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../sllices/userSlice.js';
import connectionsReducer from '../sllices/connectionSlice.js';

const authMiddleware = (store) => (next) => (action) => {
	if (action.type === 'user/logout') {
		// Adjust this based on your slice's action type
		console.trace('Logout action dispatched');
	}
	return next(action);
};

const store = configureStore({
	reducer: {
		user: userReducer,
		connections: connectionsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authMiddleware),
});

export default store;
