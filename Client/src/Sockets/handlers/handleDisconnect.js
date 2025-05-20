export default function handleDisconnect(socket) {
  socket.emit("inactiveUser");
}
