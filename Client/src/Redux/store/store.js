/** @format */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../sllices/userSlice.js';
import connectionsReducer from '../sllices/connectionSlice.js';
const store = configureStore({
	reducer: {
		user: userReducer,
		connections: connectionsReducer,
	},
});

export default store;
