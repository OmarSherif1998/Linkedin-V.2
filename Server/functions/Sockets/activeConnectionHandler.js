/** @format */

export default function activeConnectionHandler(socket) {
	socket.emit(`67db5b924a02ea0936c33668activeConnection`, 'hello');
}
