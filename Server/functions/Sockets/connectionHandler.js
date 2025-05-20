/** @format */

export default function connectionHandler(socket) {
	socket.on('disconnect', () => {
		console.log('Connection closed', socket.id);
	});
}
