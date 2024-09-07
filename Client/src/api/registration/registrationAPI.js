/** @format */

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/regi/',
	headers: {
		'Content-Type': 'application/json',
	},
});

const checkEmailExists = async (email) => {
	console.log('emailAPI: ', email);

	try {
		// Send the email as an object with a key `email`
		const response = await axiosInstance.post('/checkEmail', { email });
		console.log('Response from API: ', response); // Log the response data
		return response;
	} catch (error) {
		console.error('REGISTERATION API checkEmailExists ERROR: ', error);
	}
};
const registerUser = async (userData) => {
	try {
		const response = axiosInstance.post('/registerUser', userData);
		console.log('Response from API: ', response);
		return response;
	} catch (error) {
		console.error('REGISTERATION API registerUser ERROR:', error);
		return null;
	}
};

export { checkEmailExists, registerUser };
