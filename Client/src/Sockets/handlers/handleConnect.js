import {
  setActiveConnections,
  updateActiveConnections,
} from "../../Redux/sllices/activeConnectionSlice";

export default function handleConnect(socket, dispatch, chats) {
  socket.emit("activeUser", chats);

  socket.on(`activeConnection`, (activeConnectionSet) => {
    dispatch(setActiveConnections(activeConnectionSet));
  });
  socket.on(`userStatutChange`, (activeConnection) => {
    dispatch(updateActiveConnections(activeConnection));
  });
}
