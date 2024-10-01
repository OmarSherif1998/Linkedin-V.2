/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pendingRequests: [],
};

const connectionSlice = createSlice({
	name: 'connections',
	initialState,
	reducers: {
		addPendingRequest: (state, action) => {
			state.pendingRequests.push(action.payload);
		},
		removePendingRequest: (state, action) => {
			state.pendingRequests = state.pendingRequests.filter(
				(request) => request !== action.payload
			);
		},
		clearPendingRequests: (state) => {
			state.pendingRequests = []; // Reset the array to an empty state
		},
	},
});

export const { addPendingRequest, removePendingRequest, clearPendingRequests } =
	connectionSlice.actions;
export const selectConnection = (state) => state.connections.pendingRequests;
export default connectionSlice.reducer;
