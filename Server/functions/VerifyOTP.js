/** @format */

import redisClient from '../Redis/redis.js';

export default async function VerifyOTP(email, otp) {
	const isValid = await redisClient.get(`otp:${email}`);
	return isValid === otp;
}
