/** @format */

import redis from '../../Redis/redis.js';
import User from '../../schema/user.js';
import VERIFICATION_TYPES from '../../staticData/VerifictaionsTypes.js';

const ACTIVE_USER_HASH_KEY = VERIFICATION_TYPES.ACTIVE_USER.type;

export default function activeConnectionHandler(socket, userID) {
	socket.on('userChats', async (userChats) => {
		if (!userID || !userChats) return;

		const activeUsers = await redis.hkeys(ACTIVE_USER_HASH_KEY);
		// Convert to a Set for O(1) look-ups
		const activeUserSet = new Set(activeUsers);

		const offlineUserIds = userChats
			.filter((chat) => !activeUserSet.has(chat._id))
			.map((chat) => chat._id);

		/* ------------------------------------------------------------
		     Batch-fetch lastSeen for offline users (single query)
		   ------------------------------------------------------------ */
		const offlineUsers = await User.find(
			{ _id: { $in: offlineUserIds } },
			{ _id: 1, lastSeen: 1 },
		).lean();
		// Map<userId, lastSeen>
		const lastSeenMap = new Map(
			offlineUsers.map((u) => [u._id.toString(), u.lastSeen]),
		);
		console.log(lastSeenMap);

		const activeConnectionSet = userChats.map((chat) => {
			if (activeUserSet.has(chat._id)) {
				return {
					id: chat._id,
					activeNow: true,
					lastSeen: null,
				};
			}
			return {
				id: chat._id,
				activeNow: false,
				lastSeen: lastSeenMap.get(chat._id) || null,
			};
		});

		socket.emit(`${userID}activeConnection`, activeConnectionSet);
	});
}
