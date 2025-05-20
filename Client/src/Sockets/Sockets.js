/** @format */
import io from "socket.io-client";

let socket = null;
const getSocket = (name, userId) => {
  if (!socket) {
    // console.log(name + " is initializing socket connection");
    socket = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true,
      transports: ["websocket", "polling"],
      query: {
        userId: userId,
      },
    });

    // Add connection event listeners for debugging
    socket.on("connect", () => {
      // console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

export { getSocket };
