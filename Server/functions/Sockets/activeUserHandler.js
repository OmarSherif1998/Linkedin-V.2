/** @format */

import {
	incrementActiveUserCount,
	decrementActiveUserCount,
} from '../../Redis/ActiveUserCount.js';
import NotifyUserStatusChange from './NotifyUserStatusChange.js';
import UpdateUserStatus from './UpdateUserStatus.js';

const socketToUserMap = new Map();
const socketToChatsMap = new Map();
export default function activeUserHandler(socket, userID) {
	if (!userID) return;

	socket.on('activeUser', async (chats) => {
		try {
			socketToChatsMap.set(socket.id, chats);
			socketToUserMap.set(socket.id, userID);
			await NotifyUserStatusChange(userID, chats, true, true);
			await incrementActiveUserCount(userID);
			await UpdateUserStatus(socket, userID, chats);
			console.log('Successfully incremented active user count for:', userID);
		} catch (error) {
			console.error('Error in activeUser event handler:', error);
		}
	});

	socket.on('inactiveUser', async () => {
		try {
			const chats = socketToChatsMap.get(socket.id) || [];

			const date = Date.now();
			socketToUserMap.delete(socket.id);
			await NotifyUserStatusChange(userID, chats, false, date);
			await decrementActiveUserCount(userID);

			console.log('Successfully decremented active user count for:', userID);
		} catch (error) {
			console.error('Error in inactiveUser event handler:', error);
		}
	});

	socket.on('disconnect', async () => {
		const userId = socketToUserMap.get(socket.id);

		try {
			const date = Date.now();
			const chats = socketToChatsMap.get(socket.id) || [];
			await NotifyUserStatusChange(userID, chats, false, date);
			await decrementActiveUserCount(userId);
			socketToUserMap.delete(socket.id);
			console.log('Successfully handled disconnect for user:', userId);
		} catch (error) {
			console.error('Error in disconnect handler:', error);
		}
	});
}
