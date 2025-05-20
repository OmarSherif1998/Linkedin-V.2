/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./CSS/index.css";
import store from "./Redux/store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./functions/queryClient";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider Provider store={store}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </Provider>,
);
