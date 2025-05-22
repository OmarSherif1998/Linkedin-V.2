/** @format */

import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';
import redis from './redis.js';

export default async function DeleteFromRedis(key, value = null, type = null) {
	try {
		if (type === VERIFICATION_TYPES.ACTIVE_USER.type && value !== null) {
			// Remove user from Set
			await redis.srem(key, value.toString());
			// console.log(`Removed ACTIVE_USER ${value} from set ${key}`);
		} else {
			// Delete key completely
			await redisClient.del(key);
			// console.log(`Deleted key ${key} from Redis`);
		}
	} catch (err) {
		console.error('Error deleting from Redis:', err);
		throw err;
	}
}
