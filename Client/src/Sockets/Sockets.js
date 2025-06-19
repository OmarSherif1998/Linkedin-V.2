/** @format */
import io from 'socket.io-client';
import { Base_URL } from '../api/baseURL';

let socket = null;

const initializeSocket = (name, userID) => {
  // Always reset if socket exists for a different user/session
  if (socket) {
    // socket.disconnect();
    socket = null;
  }

  socket = io(`${Base_URL}`, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ['websocket', 'polling'],
    query: {
      UID: userID,
      sender: name,
    },
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  return socket;
};

const getSocket = () => socket;

const resetSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { initializeSocket, getSocket, resetSocket };
