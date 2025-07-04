import { logout } from "../Redux/sllices/userSlice";
import { getSocket, resetSocket } from "../Sockets/Sockets";
import queryClient from "./queryClient";

const handleLogout = (dispatch, NavigateToLogin) => {
  const socket = getSocket();
  if (!socket) return;
  // Clear user-specific cache
  queryClient.removeQueries(["UserDetails"]);
  socket.emit("inactiveUser");
  socket.disconnect();

  resetSocket();

  setTimeout(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    NavigateToLogin();
  }, 300); // enough time to emit
};

export default handleLogout;
