import { logout } from "../Redux/sllices/userSlice";
import { getSocket } from "../Sockets/Sockets";
import queryClient from "./queryClient";

const handleLogout = (dispatch, NavigateToLogin) => {
  const socket = getSocket("handleLogout");

  // Clear user-specific cache
  queryClient.removeQueries(["UserDetails"]);

  if (socket?.connected) {
    socket.emit("inactiveUser");
  }

  setTimeout(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    NavigateToLogin();
  }, 300); // enough time to emit
};

export default handleLogout;
