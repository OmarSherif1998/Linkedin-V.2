// Redux/slices/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isSocketReady: false,
  },
  reducers: {
    setSocketReady: (state) => {
      state.isSocketReady = true;
    },
  },
});

export const { setSocketReady } = socketSlice.actions;
export const selectIsSocketReady = (state) => state.socket.isSocketReady;
export default socketSlice.reducer;
