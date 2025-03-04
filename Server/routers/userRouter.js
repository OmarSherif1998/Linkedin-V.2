/** @format */

import express from 'express';
import User from '../schema/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/authenticateToken.js';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({}).select('-password');
		//console.log(users);
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching users', error: err });
	}
});

userRouter.post('/authenticateUser', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });

		const hashedPassword = user.password;

		const isMatch = await bcrypt.compare(password, hashedPassword);
		if (!isMatch)
			return res.status(401).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '3h',
		});
		res.json({ message: 'User authenticated successfully', token });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

userRouter.get('/me', authenticateToken, async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findById(userId).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});
userRouter.get('/userById/:_id', authenticateToken, async (req, res) => {
	const _id = req.params._id;

	try {
		const response = await User.findOne({ _id })
			.select('-password')
			.populate({
				path: 'posts',
				options: { limit: 4, sort: { createdAt: -1 } }, // Fetch 4 latest posts
			})
			.populate({
				path: 'comments', // If you have a direct reference to comments in User schema
				options: { limit: 4, sort: { createdAt: -1 } }, // Fetch 4 latest posts
			});

		const userData = {
			_id: response._id,
			username: response.firstName + ' ' + response.lastName,
			bio: response.bio,
			email: response.email,
			phoneNumber: response.phoneNumber,
			city: response.city,
			location: response.location,
			connectionCount: response.connectionCount,
			postsCount: response.postsCount,
			commentsCount: response.commentsCount,
			profilePicture: response.profilePicture,
			coverPicture: response.coverPicture,
			licensesAndCertifications: response.licensesAndCertifications,
			experiences: response.experiences,
			education: response.education,
			skills: response.skills,
			connections: response.connections,
			posts: response.posts,
			comments: response.comments,
			about: response.about,
		};

		if (!userData) {
			console.log('No user found with ID:', _id);
			return res.status(404).send('User not found'); // Use return to prevent further execution
		}

		res.json(userData);
	} catch (error) {
		console.error('Error fetching user data:', error.message);
		if (!res.headersSent) {
			res.status(500).send('Server error'); // Send a response only if headers are not already sent
		}
	}
});
userRouter.post('/updateUserProfilePic', async (req, res) => {
	const userData = req.body;
	const { _id, imgURL } = userData[0];

	try {
		// Example user update (profile picture)
		const user = await User.findByIdAndUpdate(
			_id,
			{ profilePicture: imgURL },
			{ new: true },
		);
		res.json(user);
	} catch (error) {
		console.error('Error updating user profile picture:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

userRouter.post('/updateUserInfo', async (req, res) => {
	try {
		const userData = req.body;

		console.log(userData);
		const updatedUser = await User.findByIdAndUpdate(userData._id, userData, {
			new: true,
		});
		console.log('User updated:', updatedUser);

		return res
			.status(200)
			.json({ message: 'User information updated successfully' });
	} catch (error) {
		console.error('Error updating user info:', error);
		return res.status(500).json({ error: 'Failed to update user info' });
	}
});
userRouter.post('/updateUserExperience', async (req, res) => {
	try {
		const { _id, experience } = req.body; // Destructure the _id and experience from the request body
		console.log(experience);
		// Assuming experience is an object to be added to the experiences array
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				$push: { experiences: experience }, // Add the new experience object to the experiences array
			},
			{ new: true },
		);

		// console.log('User updated:', updatedUser);

		return res.status(200).json({
			message: 'User experience updated successfully',
			user: updatedUser, // Return the updated user data if needed
		});
	} catch (error) {
		console.error('Error updating user info:', error);
		return res.status(500).json({ error: 'Failed to update user info' });
	}
});

userRouter.post('/updateUserEducation', async (req, res) => {
	try {
		const { _id, education } = req.body; // Destructure the _id and experience from the request body
		console.log(education);
		// Assuming experience is an object to be added to the experiences array
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				$push: { education: education }, // Add the new experience object to the experiences array
			},
			{ new: true },
		);

		console.log('User updated:', updatedUser);

		return res.status(200).json({
			message: 'User experience updated successfully',
			user: updatedUser, // Return the updated user data if needed
		});
	} catch (error) {
		console.error('Error updating user info:', error);
		return res.status(500).json({ error: 'Failed to update user info' });
	}
});

export default userRouter;
