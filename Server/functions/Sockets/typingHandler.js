/** @format */

// socketHandlers/typingHandler.js
export default function typingHandler(socket) {
	socket.on('typing', (roomId, senderID) => {
		console.log(roomId, senderID);
		socket.to(roomId).emit('userTyping', senderID);
	});

	socket.on('notTyping', (roomId, senderID) => {
		socket.to(roomId).emit('userNotTyping', senderID);
	});
}
