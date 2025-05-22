/** @format */
import UpdateLastSeen from '../functions/UpdateLastSeen.js';
import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';
import redis from './redis.js';

export async function incrementActiveUserCount(userId) {
	await redis.hincrby(
		VERIFICATION_TYPES.ACTIVE_USER.type,
		userId.toString(),
		1,
	);
}

export async function decrementActiveUserCount(userId) {
	const count = await redis.hincrby(
		VERIFICATION_TYPES.ACTIVE_USER.type,
		userId.toString(),
		-1,
	);

	if (count <= 0) {
		await redis.hdel(VERIFICATION_TYPES.ACTIVE_USER.type, userId.toString());
		await UpdateLastSeen(userId);
	}
}
