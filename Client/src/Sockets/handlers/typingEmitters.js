export function typingEmitters(
  socket,
  roomId,
  _id,
  isCurrentlyTyping,
  typingTimeoutRef,
) {
  if (!isCurrentlyTyping.current) {
    socket.emit("typing", roomId, { senderID: _id });
    isCurrentlyTyping.current = true;
  }

  // Clear previous timeout
  clearTimeout(typingTimeoutRef.current);

  // Set new timeout to emit "notTyping" after 2s of inactivity
  typingTimeoutRef.current = setTimeout(() => {
    socket.emit("notTyping", roomId, _id);
    isCurrentlyTyping.current = false;
  }, 2000);
}
