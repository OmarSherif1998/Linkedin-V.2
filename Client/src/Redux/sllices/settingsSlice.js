/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSection: "",
  // prevActiveSection: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = settingsSlice.actions;
export const selectActiveSection = (state) => state.settings.activeSection;
export const selectPrevActiveSection = (state) =>
  state.settings.prevActiveSection;
export default settingsSlice.reducer;
