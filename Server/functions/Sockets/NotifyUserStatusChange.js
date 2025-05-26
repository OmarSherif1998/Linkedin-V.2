/** @format */

import getActiveUsers from './getActiveUsers.js';
import { io } from '../../index.js';

export default async function NotifyUserStatusChange(
	userID,
	chats,
	activeNow,
	lastSeen,
) {
	const activeUsersSet = await getActiveUsers(chats);
	const activeConnection = {
		id: userID,
		activeNow: activeNow,
		lastSeen: lastSeen,
	};
	activeUsersSet.forEach((id) => {
		console.log('called: ', id);

		io.to(id).emit('userStatutChange', activeConnection);
	});
}
