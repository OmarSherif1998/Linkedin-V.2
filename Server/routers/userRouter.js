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
		console.log(users);
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
			expiresIn: '1h',
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

export default userRouter;
