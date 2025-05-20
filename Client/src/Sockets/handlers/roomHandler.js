export function roomHandler(socket, roomId) {
  socket.emit("joinRoom", roomId);

  // Return cleanup function to leave the room
  return () => {
    socket.emit("leaveRoom", roomId); // notify server
    socket.off("leaveRoom"); // clean up listener if any
  };
}
