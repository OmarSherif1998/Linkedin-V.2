/** @format */
import SaveToRedis from '../../Redis/SaveToRedis.js';
import DeleteFromRedis from '../../Redis/DeleteFromRedis.js';
import VERIFICATION_TYPES from '../../staticData/VerifictaionsTypes.js';

const ACTIVE_USERS_SET_KEY = 'activeUsers';

export default function activeUserHandler(socket) {
	const socketToUserMap = new Map();

	socket.on('activeUser', (userId) => {
		console.log('User is active', userId);
		socketToUserMap.set(socket.id, userId);
		SaveToRedis(
			ACTIVE_USERS_SET_KEY,
			userId,
			VERIFICATION_TYPES.ACTIVE_USER.type,
		);
	});

	socket.on('inactiveUser', () => {
		const userId = socketToUserMap.get(socket.id);
		console.log('User is inactive', userId);
		if (userId) {
			DeleteFromRedis(
				ACTIVE_USERS_SET_KEY,
				userId,
				VERIFICATION_TYPES.ACTIVE_USER.type,
			);
			socketToUserMap.delete(socket.id);
		}
	});

	socket.on('disconnect', () => {
		const userId = socketToUserMap.get(socket.id);
		if (userId) {
			console.log(`User disconnected: ${userId}`);
			DeleteFromRedis(
				ACTIVE_USERS_SET_KEY,
				userId,
				VERIFICATION_TYPES.ACTIVE_USER.type,
			);
			socketToUserMap.delete(socket.id);
		}
	});
}
