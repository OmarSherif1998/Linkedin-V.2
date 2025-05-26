/** @format */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../sllices/userSlice.js";
import connectionsReducer from "../sllices/connectionSlice.js";
import settingsReducer from "../sllices/settingsSlice.js";
import themeReducer from "../sllices/themeSlice.js";
import activeConnectionsReducer from "../sllices/activeConnectionSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    connections: connectionsReducer,
    settings: settingsReducer,
    theme: themeReducer,
    activeConnections: activeConnectionsReducer,
  },
});

export default store;
