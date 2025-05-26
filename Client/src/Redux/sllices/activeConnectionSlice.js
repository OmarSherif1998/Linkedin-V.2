import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeConnections: [],
};

const activeConnectionSlice = createSlice({
  name: "activeConnections",
  initialState,
  reducers: {
    setActiveConnections(state, action) {
      console.log(action.payload);

      state.activeConnections = [...action.payload];
    },
    updateActiveConnections(state, action) {
      console.log(action.payload);
      const index = state.activeConnections.findIndex(
        (obj) => obj.id === action.payload.id,
      );
      console.log("index", index);
      if (index !== -1) {
        // Update existing object
        state.activeConnections[index] = {
          ...state.activeConnections[index],
          ...action.payload,
        };
      } else {
        // Or add new object if not found
        state.activeConnections.push(action.payload);
      }
    },
    clearConnections(state) {
      state.activeConnections = [];
    },
  },
});

export const {
  setActiveConnections,
  updateActiveConnections,
  clearConnections,
} = activeConnectionSlice.actions;
export const selectActiveConnections = (state) =>
  state.activeConnections.activeConnections;

export default activeConnectionSlice.reducer;
