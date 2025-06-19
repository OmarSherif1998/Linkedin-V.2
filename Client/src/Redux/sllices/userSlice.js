/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  userChats: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    editUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setChats: (state, action) => {
      if (state.user) {
        state.userChats = [...action.payload];
      }
    },
  },
});

export const { login, logout, editUser, setChats } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserChats = (state) => state.user.userChats;
export default userSlice.reducer;
