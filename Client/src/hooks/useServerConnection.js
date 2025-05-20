import { useEffect } from "react";
import { getSocket } from "../Sockets/Sockets";
import handleConnect from "../Sockets/handlers/handleConnect";
import handleDisconnect from "../Sockets/handlers/handleDisconnect";

export function useServerConnection({ user }) {
  useEffect(() => {
    if (!user?._id) return;

    const socket = getSocket("useServerConnection", user._id);

    const onConnect = () => handleConnect(user._id, socket);
    const onDisconnect = () => handleDisconnect(socket);

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("activeUser");
      socket.off("inactiveUser");
      socket.off("activeConnection");
    };
  }, [user?._id]);
}
