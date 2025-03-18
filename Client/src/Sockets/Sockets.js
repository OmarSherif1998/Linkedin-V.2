/** @format */

// src/socket.js
import io from "socket.io-client";

let socket;

const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
  }
  return socket;
};

export { initializeSocket };
