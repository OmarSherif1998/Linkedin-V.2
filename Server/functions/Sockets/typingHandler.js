/** @format */

// socketHandlers/typingHandler.js
export const typingHandler = (socket) => {
	socket.on('typing', (roomId, senderID) => {
		console.log(roomId, senderID);
		socket.to(roomId).emit('userTyping', senderID);
	});

	socket.on('notTyping', (roomId, senderID) => {
		socket.to(roomId).emit('userNotTyping', senderID);
	});
};
