/** @format */

// socketHandlers/roomHandler.js
export const roomHandler = (socket) => {
	socket.on('joinRoom', (roomId) => {
		socket.join(roomId);
	});
	socket.on('leaveRoom', (roomId) => {
		socket.leave(roomId);
	});
};
