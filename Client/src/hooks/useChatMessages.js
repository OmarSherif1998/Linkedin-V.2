import { useEffect, useState } from "react";
import { initializeSocket } from "../Sockets/Sockets";
import { useUser } from "./useUser";

const socket = initializeSocket();

export default function useChatMessages(roomId) {
  const [chatMessages, setChatMessages] = useState([]);
  const { _id } = useUser();

  useEffect(() => {
    joinRoom(roomId);

    socket.on("receivedMessage", (receivedMessage, senderID) => {
      if (receivedMessage && senderID !== _id) {
        setChatMessages((prevMessage) => [
          ...prevMessage,
          { type: "incomingMessage", message: receivedMessage },
        ]);
      }
    });

    socket.on("connect", () => {
      console.log("Reconnected to server");
      joinRoom();
    });

    return () => {
      socket.off("receivedMessage");
      socket.off("connect");
    };
  }, []);

  return chatMessages;
}

const joinRoom = (roomId) => {
  if (roomId) {
    socket.emit("joinRoom", roomId);
  }
};
