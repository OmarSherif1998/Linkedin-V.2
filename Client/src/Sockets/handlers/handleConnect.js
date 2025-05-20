import queryClient from "../../functions/queryClient";

export default function handleConnect(userId, socket) {
  const data = queryClient.getQueryData(["chats"]);
  console.log(data);
  if (userId) {
    socket.emit("activeUser", userId);
    socket.on(`${userId}activeConnection`, (data) => {
      console.log(data);
    });
  }
}
