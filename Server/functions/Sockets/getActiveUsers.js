/** @format */
import redis from '../../Redis/redis.js';
import VERIFICATION_TYPES from '../../staticData/VerifictaionsTypes.js';

const ACTIVE_USER_HASH_KEY = VERIFICATION_TYPES.ACTIVE_USER.type;

export default async function getActiveUsers(chatIDs) {
	// console.log('ChatIDs: ', chatIDs);
	const existingKeys = await redis.hkeys(ACTIVE_USER_HASH_KEY);
	const existingKeySet = new Set(existingKeys);
	// console.log('existingKeys', existingKeys);
	// console.log('existingKeySet', typeof existingKeySet);

	const onlineChatIDs = chatIDs.filter((id) => existingKeySet.has(id));
	// console.log('OIDs: ', onlineChatIDs);
	return new Set(onlineChatIDs);
}
