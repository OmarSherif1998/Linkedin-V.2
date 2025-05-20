/** @format */

import handleChatMessages from '../../middlewares/handleChatMessages.js';

export const messageHandler = (socket) => {
	socket.on('sentMessage', async (roomId, message, senderID, receiverID) => {
		await handleChatMessages(roomId, message, senderID, receiverID);
	});
};
