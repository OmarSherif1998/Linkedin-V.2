/** @format */
import redis from './redis.js';
import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';

export default async function SaveToRedis(key, value, type) {
	try {
		const EXPIRATION_LOOKUP = Object.fromEntries(
			Object.values(VERIFICATION_TYPES).map(({ type, EXPIRATION }) => [
				type,
				EXPIRATION,
			]),
		);

		const EXP = EXPIRATION_LOOKUP[type];

		if (EXP === null || EXP === Infinity || EXP === 0) {
			await redis.set(key, value.toString()); // no expiration
			// console.log(`Saved ${type} for ${key} without expiration`);
		} else {
			await redis.set(key, value.toString(), 'EX', EXP); // with expiration
			// console.log(`Saved ${type} for ${key} with expiration ${EXP}s`);
		}
	} catch (err) {
		console.error('Error saving key to Redis:', err);
		throw err;
	}
}
// /** @format */
// import redis from './redis.js';
// import VERIFICATION_TYPES from '../staticData/VerifictaionsTypes.js';

// export default async function SaveToRedis(key, value, type) {
// 	try {
// 		const EXPIRATION_LOOKUP = Object.fromEntries(
// 			Object.values(VERIFICATION_TYPES).map(({ type, EXPIRATION }) => [
// 				type,
// 				EXPIRATION,
// 			]),
// 		);

// 		const EXP = EXPIRATION_LOOKUP[type];

// 		if (type === VERIFICATION_TYPES.ACTIVE_USER.type) {
// 			// Use SADD to add user to a Set under the key
// 			await redis.sadd(key, value.toString());
// 			// console.log(`Added ACTIVE_USER ${value} to set ${key}`);
// 		} else if (EXP === null || EXP === Infinity || EXP === 0) {
// 			await redis.set(key, value.toString()); // no expiration
// 			// console.log(`Saved ${type} for ${key} without expiration`);
// 		} else {
// 			await redis.set(key, value.toString(), 'EX', EXP); // with expiration
// 			// console.log(`Saved ${type} for ${key} with expiration ${EXP}s`);
// 		}
// 	} catch (err) {
// 		console.error('Error saving key to Redis:', err);
// 		throw err;
// 	}
// }
