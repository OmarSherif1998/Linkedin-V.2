import { useEffect } from "react";
import { getSocket } from "../Sockets/Sockets";
import { useDispatch } from "react-redux";

import handleConnect from "../Sockets/handlers/handleConnect";
import handleDisconnect from "../Sockets/handlers/handleDisconnect";

export function useServerConnection(user) {
  const dispatch = useDispatch();
  // const userChats = useSelector(selectUserChats);
  useEffect(() => {
    if (!user?._id) return;

    const socket = getSocket("useServerConnection", user._id);

    const onConnect = () => handleConnect(socket, dispatch, user._id);
    const onDisconnect = () => handleDisconnect(socket);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("activeUser");
      socket.off("inactiveUser");
    };
  }, [user?._id]);
}
