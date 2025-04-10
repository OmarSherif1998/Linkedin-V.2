/** @format */

import React, { useEffect, useState } from "react";
import { initializeSocket } from "../Sockets/Sockets";
import { useUser } from "../hooks/useUser";
import Feed from "../components/Home/Feed";
import Sidebar from "../components/Home/Sidebar";
import Connection from "../components/Home/Connection";
import Chat from "./Chat";
import LoggedUserFooter from "../components/util/LoggedUserFooter";

function Home() {
  const user = useUser();
  const socket = initializeSocket();
  const [isConnected, setIsConnected] = useState(true);
  const [isConnectedMessage, setIsConnectedMessage] = useState(false);
  const [hasReconnected, setHasReconnected] = useState(false);
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      if (hasReconnected) {
        setIsConnectedMessage(true);

        setTimeout(() => {
          setIsConnectedMessage(false);
        }, 2000);
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Only set hasReconnected after the first connection
    if (!hasReconnected) {
      setHasReconnected(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [hasReconnected]);

  const pageSpcs = {
    width: "fit",
    title: " Add to your feed",
  };

  return (
    <div className="w-full lg:flex lg:justify-between lg:px-10">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <Feed user={user} />
      <div className="hidden lg:flex lg:flex-col">
        <Connection pageSpecs={pageSpcs} />
        <LoggedUserFooter />
      </div>
      {!isConnected && (
        <div className="fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-red-500 w-fit">
          Server disconnected. Reconnecting...
        </div>
      )}
      {isConnectedMessage && (
        <div className="fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-green-500 w-fit">
          Connected
        </div>
      )}
      <div className="hidden lg:fixed lg:bottom-0 lg:right-0 lg:z-50 lg:block">
        <Chat />
      </div>
    </div>
  );
}

export default Home;
