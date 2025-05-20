export function typingReceiver(socket, _id, setIsFriendTyping) {
  socket.on("userTyping", (senderID) => {
    if (senderID !== _id) {
      setIsFriendTyping(true);
    }
  });
  socket.on("userNotTyping", (senderID) => {
    if (senderID !== _id) {
      setIsFriendTyping(false);
    }
  });

  return () => {
    socket.off("userTyping");
    socket.off("userNotTyping");
  };
}
