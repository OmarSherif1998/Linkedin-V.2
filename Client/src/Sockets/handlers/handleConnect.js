import { setActiveConnections } from "../../Redux/sllices/activeConnectionSlice";

export default function handleConnect(socket, dispatch, userID) {
  socket.emit("activeUser");
  socket.on(`${userID}activeUsersUpdates`, (activeConnectionSet) => {
    dispatch(setActiveConnections(activeConnectionSet));
  });
  // socket.on("notifications");
}
