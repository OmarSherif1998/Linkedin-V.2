/** @format */

import { io } from '../../index.js';
import User from '../../schema/user.js';
import getActiveUsers from './getActiveUsers.js';

export default async function UpdateUserStatus(socket, userID, userChats) {
	if (!userID || !userChats) return;

	const activeUserSet = await getActiveUsers(userChats);
	console.log('activeUserSet: ', typeof activeUserSet);
	const offlineUserIds = userChats
		.filter((chatId) => !activeUserSet.has(chatId))
		.map((chatId) => chatId);

	/* ------------------------------------------------------------
		     Batch-fetch lastSeen for offline users (single query)
		   ------------------------------------------------------------ */
	const offlineUsers = await User.find(
		{ _id: { $in: offlineUserIds } },
		{ _id: 1, lastSeen: 1 },
	);

	// Map<userId, lastSeen>
	const lastSeenMap = new Map(
		offlineUsers.map((u) => [u._id.toString(), u.lastSeen]),
	);
	console.log('offline users: ', lastSeenMap);
	console.log('activeUserSet: ', activeUserSet);
	console.log('userChats: ', userChats);

	const activeConnectionSet = userChats.map((chat) => {
		console.log('ChatID: ', chat);
		if (activeUserSet.has(chat)) {
			return {
				id: chat,
				activeNow: true,
				lastSeen: null,
			};
		}
		return {
			id: chat,
			activeNow: false,
			lastSeen: lastSeenMap.get(chat) || null,
		};
	});

	io.to(userID).emit(`activeConnection`, activeConnectionSet);
}
