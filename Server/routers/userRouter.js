/** @format */

import express from 'express';
import User from '../api/db/models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching users', error: err });
	}
});

userRouter.post('/authenticateUser', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user.email === email) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = user.password;
			const isMatch = await bcrypt.compare(password, hashedPassword);
			if (isMatch) {
				//Generate JWT token

				const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
					expiresIn: '1h',
				});
				res.json({ message: 'User authenticated successfully', token });
			} else {
				res.status(401).json({ message: 'Invalid credentials' });
			}
		}
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error' });
	}
});
export default userRouter;
