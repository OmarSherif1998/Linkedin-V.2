/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingRequests: [],
  connections: [], // Add your own connections array here if needed. It can be fetched from an API or local storage.
};

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addPendingRequest: (state, action) => {
      state.pendingRequests.push(action.payload);
    },
    removePendingRequest: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request !== action.payload,
      );
    },
    clearPendingRequests: (state) => {
      state.pendingRequests = []; // Reset the array to an empty state
    },
    addConnections: (state, action) => {
      state.connections = state.connections.concat(action.payload);
    },
  },
});

export const {
  addPendingRequest,
  removePendingRequest,
  clearPendingRequests,
  addConnections,
} = connectionSlice.actions;
export const selectPendingRequests = (state) =>
  state.connections.pendingRequests;
export const selectConnections = (state) => state.connections.connections;
export default connectionSlice.reducer;
