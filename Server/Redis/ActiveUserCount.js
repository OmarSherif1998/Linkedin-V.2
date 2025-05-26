/** @format */
import UpdateLastSeen from '../functions/UpdateLastSeen.js';
import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';
import redis from './redis.js';
const ACTIVE_USER_HASH_KEY = VERIFICATION_TYPES.ACTIVE_USER.type;
export async function incrementActiveUserCount(userID) {
	try {
		// console.log('Incrementing active user count for', userID);
		await redis.hincrby(ACTIVE_USER_HASH_KEY, userID, 1);
	} catch (error) {
		console.error('Error incrementing active user count for', userID, error);
	}
}

export async function decrementActiveUserCount(userID) {
	try {
		// console.log('Decrementing active user count for', userID);
		const count = await redis.hincrby(ACTIVE_USER_HASH_KEY, userID, -1);

		if (count <= 0) {
			await redis.hdel(ACTIVE_USER_HASH_KEY, userID);
			await UpdateLastSeen(userID);
		}
	} catch (error) {
		console.error('Error decrementing active user count for', userID, error);
	}
}
