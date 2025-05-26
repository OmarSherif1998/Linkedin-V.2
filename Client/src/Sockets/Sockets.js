/** @format */
import io from "socket.io-client";

let socket = null;

const initializeSocket = (name, userID) => {
  // Always reset if socket exists for a different user/session
  if (socket) {
    // socket.disconnect();
    socket = null;
  }

  socket = io("http://localhost:3001", {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ["websocket", "polling"],
    query: {
      UID: userID,
      sender: name,
    },
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
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
