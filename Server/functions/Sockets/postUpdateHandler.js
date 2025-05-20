/** @format */

// socketHandlers/postUpdateHandler.js
export const postUpdateHandler = (socket) => {
	socket.on('postUpdate', () => {
		console.log('Received postUpdate message from client');
	});
};
