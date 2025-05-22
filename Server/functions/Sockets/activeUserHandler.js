/** @format */

import {
	incrementActiveUserCount,
	decrementActiveUserCount,
} from '../../Redis/ActiveUserCount.js';

const socketToUserMap = new Map();

export default function activeUserHandler(socket, userID) {
	socket.on('activeUser', () => {
		socketToUserMap.set(socket.id, userID);

		incrementActiveUserCount(userID);
	});

	socket.on('inactiveUser', async () => {
		if (userID) {
			await decrementActiveUserCount(userID);
			socketToUserMap.delete(socket.id);
		}
	});

	socket.on('disconnect', async () => {
		const userId = socketToUserMap.get(socket.id);
		if (userId) {
			await decrementActiveUserCount(userId);
			socketToUserMap.delete(socket.id);
		}
	});
}

// /** @format */
// import SaveToRedis from '../../Redis/SaveToRedis.js';
// import DeleteFromRedis from '../../Redis/DeleteFromRedis.js';
// import VERIFICATION_TYPES from '../../staticData/VerifictaionsTypes.js';
// import UpdateLastSeen from '../UpdateLastSeen.js';

// const ACTIVE_USERS_SET_KEY = 'activeUsers';
// const socketToUserMap = new Map();

// export default function activeUserHandler(socket, userID) {
// 	socket.on('activeUser', () => {
// 		socketToUserMap.set(socket.id, userID);

// 		SaveToRedis(
// 			ACTIVE_USERS_SET_KEY,
// 			userID,
// 			VERIFICATION_TYPES.ACTIVE_USER.type,
// 		);
// 	});

// 	socket.on('inactiveUser', async () => {
// 		// console.log('User is inactive', userID);
// 		if (userID) {
// 			await UpdateLastSeen(userID);
// 			DeleteFromRedis(
// 				ACTIVE_USERS_SET_KEY,
// 				userID,
// 				VERIFICATION_TYPES.ACTIVE_USER.type,
// 			);
// 			socketToUserMap.delete(socket.id);
// 		}
// 	});

// 	socket.on('disconnect', async () => {
// 		const userId = socketToUserMap.get(socket.id);
// 		if (userId) {
// 			await UpdateLastSeen(userId);
// 			DeleteFromRedis(
// 				ACTIVE_USERS_SET_KEY,
// 				userId,
// 				VERIFICATION_TYPES.ACTIVE_USER.type,
// 			);
// 			socketToUserMap.delete(socket.id);
// 		}
// 	});
// }
