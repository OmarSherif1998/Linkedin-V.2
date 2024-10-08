/** @format */

// src/socket.js
import io from 'socket.io-client';

let socket;

const initializeSocket = () => {
	if (!socket) {
		socket = io('http://localhost:3001');
	}
	return socket;
};

export { initializeSocket };
