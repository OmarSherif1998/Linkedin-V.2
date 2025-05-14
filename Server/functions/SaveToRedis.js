/** @format */
import client from '../Redis/redis.js';
import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';

export default async function SaveToRedis(key, value, type) {
	try {
		const EXP =
			type === VERIFICATION_TYPES.OTP.type
				? VERIFICATION_TYPES.OTP.EXPIRATION
				: VERIFICATION_TYPES.ACCOUNT_VERIFICATION.EXPIRATION;

		// Use the connected client to save the VALUE
		await client.setEx(key, EXP, value.toString()); // expires in 5 minutes
		console.log(`Saved OTP for ${key}`);
	} catch (err) {
		console.error('Error saving key to Redis:', err);
		throw err;
	}
}
