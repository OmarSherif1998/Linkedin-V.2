/** @format */
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/users/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // Send cookies with requests
});
const authenticateUser = async (user) => {
	try {
		const response = await axiosInstance.post('/authenticateUser', user);
		const { token } = response.data;
		return token;
	} catch (error) {
		console.error(' USER API ERROR: Error logging in:', error.message);
		if (error.response && error.response.status === 401) {
			console.error(' USER API ERROR: Invalid credentials');
		}
		return null;
	}
};
const fetchAllUsers = async () => {
	try {
		console.log('Fetching..');
		const response = await axiosInstance.get('/');
		return response.data;
	} catch (error) {
		console.error(' USER API ERROR: Error fetching users:', error.message);
		return null;
	}
};
const fetchMyData = async (token) => {
	if (token) {
		try {
			console.log('Trying to fetch...');
			const response = await axiosInstance.get('/me', {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			console.error(
				' USER API ERROR: Error fetching user data:',
				error.message,
			);
			return null;
		}
	} else {
		return 'Token not found';
	}
};

const getUserByID = async (_id, token) => {
	if (token) {
		console.log('Trying to fetch user by ID...');
		try {
			const response = await axiosInstance.get(`/userById/${_id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			return response.data;
		} catch (error) {
			console.error('USER API ERROR: Error fetching user data:', error.message);
			return null;
		}
	} else {
		return 'Token not found';
	}
};

const updateUserProfilePic = async (user, imgURL) => {
	try {
		const useDetails = [{ _id: user, imgURL: imgURL }];
		await axiosInstance.post('/updateUserProfilePic', useDetails);
	} catch (error) {
		console.error(
			'USER API ERROR: Error updating user profile Picture:',
			error.message,
		);
	}
};
const updateUserInfo = async (UserInfo) => {
	try {
		const response = await axiosInstance.post('/updateUserInfo', UserInfo);
		console.log(response);
		return response;
	} catch (error) {
		console.error('USER API ERROR: Error updating user info:', error.message);
	}
};
const updateUserExperience = async (UserInfo) => {
	try {
		const response = await axiosInstance.post(
			'/updateUserExperience',
			UserInfo,
		);
		console.log(response);
		return response;
	} catch (error) {
		console.error('USER API ERROR: Error updating user info:', error.message);
	}
};
const updateUserEducation = async (UserInfo) => {
	try {
		const response = await axiosInstance.post('/updateUserEducation', UserInfo);
		console.log(response);
		return response;
	} catch (error) {
		console.error('USER API ERROR: Error updating user info:', error.message);
	}
};
const updateUserPassword = async (CurrentPassword, NewPassword, _id) => {
	try {
		const UserInfo = {
			CurrentPassword,
			NewPassword,
			_id,
		};
		const response = await axiosInstance.post('/updateUserPassword', UserInfo);
		console.log(response);
		return response;
	} catch (error) {
		console.error('USER API ERROR: Error updating user info:', error.message);
	}
};

export {
	fetchAllUsers,
	fetchMyData,
	authenticateUser,
	getUserByID,
	updateUserProfilePic,
	updateUserInfo,
	updateUserExperience,
	updateUserEducation,
	updateUserPassword,
};
