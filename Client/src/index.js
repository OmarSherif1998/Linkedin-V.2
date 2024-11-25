/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './CSS/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	// 	<Provider Provider store={store}>
	// 		<Router>
	// 			<App />
	// 		</Router>
	// 	</Provider>
	// </React.StrictMode>

	<Provider Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
