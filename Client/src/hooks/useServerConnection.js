import { useEffect, useRef, useState } from "react";
import { initializeSocket } from "../Sockets/Sockets";
import { useDispatch } from "react-redux";

import handleConnect from "../Sockets/handlers/handleConnect";
import handleDisconnect from "../Sockets/handlers/handleDisconnect";

export function useServerConnection({ userID, chats }) {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!userID) return;
    // if (isMounted.current) return;

    // isMounted.current = true;

    const socket = initializeSocket("useServerConnection", userID);
    if (!socket) return;

    setSocket(socket);

    const onConnect = () => {
      handleConnect(socket, dispatch, chats);
    };

    const onDisconnect = () => {
      handleDisconnect(socket, chats);
    };

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(`activeUsersUpdates`);
    };
  }, [userID, dispatch, chats]);

  return socket;
}
