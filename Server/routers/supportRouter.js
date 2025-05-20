/** @format */

import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import ValidateEmail from '../functions/ValidateEmail.js';
import GenerateOTP from '../functions/GenerateOTP.js';
import SaveToRedis from '../Redis/SaveToRedis.js';
import createPasswordResetEmail from '../templates/createPasswordResetEmail.js';
import VerifyOTP from '../functions/VerifyOTP.js';
import User from '../schema/user.js';
import bcrypt from 'bcryptjs';
import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';
import createAccountVerificationEmail from '../templates/createAccountVerificationEmail.js';
import jwt from 'jsonwebtoken';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const supportRouter = express.Router();

supportRouter.post('/sendOTP', async (req, res) => {
	const { email } = req.body;
	const response = await ValidateEmail(email, res);
	if (!response.status) {
		return res.status(400).json({ error: response.value });
	}
	const userID = response.value;
	const otp = GenerateOTP();

	SaveToRedis(email, otp, VERIFICATION_TYPES.OTP);
	const msg = createPasswordResetEmail(email, otp, VERIFICATION_TYPES.OTP);
	sgMail.send(msg);
	res.status(200).json({ message: 'Email sent successfully', userID });
});

supportRouter.post('/verifyOTP', async (req, res) => {
	const { email, otp } = req.body;
	const isValid = await VerifyOTP(email, otp);
	res.status(200).json({ isValid });
});

supportRouter.post('/resetPassword', async (req, res) => {
	try {
		const { newPassword, userID } = req.body;
		const user = await User.findById(userID).select('password');
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);
		await user.save();
		return res.status(200).json({ message: 'Password updated successfully' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

supportRouter.post('/sendVerificationEmail', async (req, res) => {
	const { email, _id } = req.body;
	const token = jwt.sign({ email }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});

	await SaveToRedis(_id, token, VERIFICATION_TYPES.ACCOUNT_VERIFICATION);
	const link = `${process.env.FRONTEND_URL}/verifyAccount/${token}`;
	const msg = createAccountVerificationEmail({ email, link });
	sgMail.send(msg);
	res.status(200).json({ message: 'Email sent successfully' });
});

supportRouter.post('/verifyAccount/:token', async (req, res) => {
	const { token } = req.params;
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { email } = decoded; // Assuming the email is in the token payload
		// Find the user based on the email decoded from the token
		const user = await User.findOne({ email: email.toString() });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check if the user is already verified
		if (user.verified) {
			return res.status(400).json({ message: 'Account already verified' });
		}

		// Otherwise, proceed with verifying the account
		user.verified = true;
		await user.save();

		return res.status(200).json({
			message: 'Account verified successfully',
			email: email.toString(),
		});
	} catch (error) {
		console.error('Verification Error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

supportRouter.post('/darkMode', async (req, res) => {
	const { userID } = req.body;
	const user = await User.findById(userID);
	user.darkMode = !user.darkMode;
	await user.save();
	res.status(200).json({ message: 'Dark mode enabled' });
});
export default supportRouter;
