/** @format */

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/post/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Send cookies with requests
});
const fecthPosts = async () => {
	try {
		const response = await axiosInstance.get('/posts');

		return response.data;
	} catch (error) {
		console.error('POST API ERROR: ', error);
	}
};
const createPost = async (content, token) => {
	try {
		const response = await axiosInstance.post('/create', content, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('POST API ERROR: ', error);
	}
};
const deletePost = async (postID) => {};
export { createPost, deletePost, fecthPosts };
