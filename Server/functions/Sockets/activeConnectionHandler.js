/** @format */

import redis from '../../Redis/redis.js';
import redisSets from '../../staticData/redisSets.js';

export default function activeConnectionHandler(socket, userID) {
	socket.on('userChats', async (userChats) => {
		const date = new Date();
		if (!userID || !userChats) return;

		const activeUsers = await redis.smembers(redisSets.activeUsers);
		const activeConnectionSet = [];

		userChats.forEach((chat) => {
			if (activeUsers.includes(chat._id)) {
				activeConnectionSet.push({
					id: chat._id,
					activeNow: true,
					lastSeen: date.getTime(),
				});
			} else {
				activeConnectionSet.push({
					id: chat._id,
					activeNow: false,
					lastSeen: date.getTime(),
				});
			}
		});

		socket.emit(`${userID}activeConnection`, activeConnectionSet);
	});
}
