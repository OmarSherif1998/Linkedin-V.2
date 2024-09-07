/** @format */

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/POST/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Send cookies with requests
});

const createPost = async (content) => {
	try {
		const response = await axiosInstance.post('/create', content);
		return response;
	} catch (error) {
		console.error('POST API ERROR: ', error);
	}
};

export { createPost };
