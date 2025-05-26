export default function handleDisconnect(socket, chats) {
  socket.emit("inactiveUser", chats);
}
