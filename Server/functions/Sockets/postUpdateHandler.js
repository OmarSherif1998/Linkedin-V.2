/** @format */

// socketHandlers/postUpdateHandler.js
export default function postUpdateHandler(socket) {
	socket.on('postUpdate', () => {
		console.log('Received postUpdate message from client');
	});
}
