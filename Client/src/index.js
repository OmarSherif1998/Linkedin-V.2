/** @format */

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./CSS/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <Provider Provider store={store}>
    <Router>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StrictMode>
    </Router>
  </Provider>,
);
