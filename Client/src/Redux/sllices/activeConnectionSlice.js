import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeConnections: [],
};

const activeConnectionSlice = createSlice({
  name: "activeConnections",
  initialState,
  reducers: {
    setActiveConnections(state, action) {
      state.activeConnections = [...action.payload];
    },
    clearConnections(state) {
      state.activeConnections = [];
    },
  },
});

export const { setActiveConnections, clearConnections } =
  activeConnectionSlice.actions;
export const selectActiveConnections = (state) =>
  state.activeConnections.activeConnections;

export default activeConnectionSlice.reducer;
