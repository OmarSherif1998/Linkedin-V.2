/** @format */

// socketHandlers/roomHandler.js
export default function roomHandler(socket) {
	socket.on('joinRoom', (roomId) => {
		socket.join(roomId);
	});
	socket.on('leaveRoom', (roomId) => {
		socket.leave(roomId);
	});
}
