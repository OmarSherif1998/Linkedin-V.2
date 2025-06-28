/** @format */

import express from 'express';
import User from '../schema/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/authenticateToken.js';
import Chat from '../schema/chat.js';
import mongoose from 'mongoose';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({}).select('-password');

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
		// console.log(isMatch);
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
		const user = await User.findById(userId)
			.populate({
				path: 'experiences.company',
				select: 'name profilePicture',
			})
			.populate({
				path: 'education.university',
				select: 'name profilePicture',
			})
			.select('-password');
		const userChats = await Chat.find({
			participants: userId,
		}).select('participants');
		const chatParticipants = userChats.map((chat) =>
			chat.participants
				.find((id) => id.toString() !== userId.toString())
				?.toString(),
		);
		const userData = { ...user.toObject(), chatParticipants };

		res.json(userData);
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/userById/:_id', authenticateToken, async (req, res) => {
	const _id = req.params._id;
	const { fields } = req.query;
	if (!_id) {
		return res.status(400).json({ message: 'User ID is required' });
	}
	try {
		// Always exclude password
		const user = await User.findById(_id)
			.select('-password')
			.populate({
				path: 'posts',
				options: { limit: 4, sort: { createdAt: -1 } },
			})
			.populate({
				path: 'comments',
				options: { limit: 4, sort: { createdAt: -1 } },
			})
			.populate({
				path: 'experiences.company',
				select: 'name profilePicture',
			})
			.populate({
				path: 'education.university',
				select: 'name profilePicture',
			});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// Return basic user fields for chat context
		if (fields === 'basicUser') {
			return res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				bio: user.bio,
				profilePicture: user.profilePicture,
			});
		}

		// Default full profile
		const userData = {
			_id: user._id,
			username: `${user.firstName} ${user.lastName}`,
			bio: user.bio,
			email: user.email,
			phoneNumber: user.phoneNumber,
			city: user.city,
			country: user.country,
			connectionCount: user.connectionCount,
			postsCount: user.postsCount,
			commentsCount: user.commentsCount,
			profilePicture: user.profilePicture,
			coverPicture: user.coverPicture,
			licensesAndCertifications: user.licensesAndCertifications,
			experiences: user.experiences,
			education: user.education,
			skills: user.skills,
			connections: user.connections,
			posts: user.posts,
			comments: user.comments,
			about: user.about,
			verified: user.verified,
		};

		res.json(userData);
	} catch (error) {
		console.error('Error fetching user data:', error.message);
		if (!res.headersSent) {
			res.status(500).json({ message: 'Server error' });
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

		// console.log(userData);
		const updatedUser = await User.findByIdAndUpdate(userData._id, userData, {
			new: true,
		});
		// console.log('User updated:', updatedUser);

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
		const { _id, experience } = req.body;
		// console.log(experience);
		// Assuming experience is an object to be added to the experiences array
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				$push: { experiences: experience },
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
		// console.log(education);
		// Assuming experience is an object to be added to the experiences array
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				$push: { education: education }, // Add the new experience object to the experiences array
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
userRouter.post('/updateUserPassword', async (req, res) => {
	try {
		const { CurrentPassword, NewPassword, _id } = req.body;

		const user = await User.findById(_id).select('password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(CurrentPassword, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(NewPassword, salt);
		await user.save();
		return res.status(200).json({ message: 'Password updated successfully' });
	} catch (error) {
		console.error('Error updating password:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

userRouter.post('/suggestedUsers', async (req, res) => {
	const { exclude = [], page = 1, limit = 10 } = req.body;
	try {
		const users = await User.find({ _id: { $nin: exclude } })
			.select('_id bio profilePicture coverPicture firstName lastName') // Only select needed fields
			.skip((page - 1) * limit)
			.limit(limit);

		res.status(200).json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ message: 'Error fetching users', error: err });
	}
});

userRouter.post('/AddToFeedUsers', async (req, res) => {
	const { exclude = [], limit = 3 } = req.body;
	const excludeObjectIds = exclude.map((id) => new mongoose.Types.ObjectId(id));
	try {
		const users = await User.aggregate([
			{ $match: { _id: { $nin: excludeObjectIds } } },
			{ $sample: { size: limit } },
			{
				$project: {
					_id: 1,
					bio: 1,
					profilePicture: 1,
					coverPicture: 1,
					firstName: 1,
					lastName: 1,
				},
			},
		]);

		res.status(200).json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ message: 'Error fetching users', error: err });
	}
});
// userRouter.post('/ِAddToFeedUsers', async (req, res) => {
// 	const { exclude = [],  limit = 3 } = req.body;
// 	try {
// 		const users = await User.find({ _id: { $nin: exclude } })
// 			.select('_id bio profilePicture coverPicture firstName lastName') // Only select needed fields
// 			.limit(limit);

// 		res.status(200).json(users);
// 	} catch (err) {
// 		console.error('Error fetching users:', err);
// 		res.status(500).json({ message: 'Error fetching users', error: err });
// 	}
// });

userRouter.post('/updateUserJobPreferences', async (req, res) => {
	try {
		const { preferences, userID } = req.body;
		console.log(preferences);
		if (!preferences || !userID) {
			return res
				.status(400)
				.json({ message: 'preferences or userID is missing' });
		}

		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{ jobPreference: preferences },
			{ new: true }, // to return the updated document
		);

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res
			.status(200)
			.json({ message: 'Preferences updated successfully', user: updatedUser });
	} catch (error) {
		console.error('Error updating preferences:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

export default userRouter;
