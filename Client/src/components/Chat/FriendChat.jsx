/** @format */

import React, { useEffect, useState } from "react";
import { initializeSocket } from "../../Sockets/Sockets";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/sllices/userSlice";
import roomIdGenearator from "../../functions/roomIdGenearator";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { getHistoricalMessages } from "../../api/chatAPi";
import { useNavigation } from "../../hooks/useNavigation";

function FriendChat({
  friendChatInfo = {},
  isFriendChat,
  CloseIcon,
  closeChatTab,
  chatId,
}) {
  const socket = initializeSocket();
  const user = useSelector(selectUser);
  const FriendChatID = chatId;
  const roomId = roomIdGenearator(user._id, friendChatInfo._id);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { NavigateToVisitedProfile, NavigateToProfile } = useNavigation();

  useEffect(() => {
    const fetchHistoricalMessages = async () => {
      const response = await getHistoricalMessages(currentPage, roomId);
      //	console.log(response);
      const historicalMessages = response?.map((msg) => {
        return {
          type: msg.sender === user._id ? "outgoingMessage" : "incomingMessage",
          message: msg.content,
        };
      });
      if (historicalMessages) {
        setChatMessages((prevMessages) => [
          ...historicalMessages,
          ...prevMessages,
        ]);
      }
    };
    fetchHistoricalMessages();
  }, [currentPage]);
  useEffect(() => {
    const joinRoom = () => {
      if (roomId) {
        socket.emit("joinRoom", roomId);
      }
    };
    joinRoom();

    socket.on("receivedMessage", (receivedMessage, senderID) => {
      if (receivedMessage && senderID !== user?._id) {
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

  // Function to handle sending messages on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const OutgoingMessage = e.target.value.trim();

      if (OutgoingMessage) {
        setChatMessages((prevMessage) => [
          ...prevMessage,
          { type: "outgoingMessage", message: OutgoingMessage },
        ]);
      }
      socket.emit(
        "sentMessage",
        roomId,
        OutgoingMessage,
        user._id,
        friendChatInfo._id,
      );
      e.target.value = "";
    }
  };

  return (
    <div className="flex h-[400px] w-[320px] flex-col overflow-hidden rounded-t-lg border border-gray-300 bg-white shadow-lg">
      {/* Header */}
      <nav className="flex items-center justify-between border-b bg-gray-100 p-2">
        <div className="flex items-center">
          <img
            src={friendChatInfo.profilePicture}
            alt=""
            className="mr-2 h-8 w-8 rounded-full object-cover"
          />
          <h2 className="text-sm font-medium">
            {friendChatInfo.firstName && friendChatInfo.lastName
              ? `${friendChatInfo.firstName} ${friendChatInfo.lastName}  `
              : friendChatInfo.name}
          </h2>
        </div>
        <section className="flex gap-1">
          {" "}
          <MoreHorizIcon />
          <VideocamIcon
            fontSize="small"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
          <CloseIcon
            fontSize="small"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => closeChatTab(FriendChatID)}
          />
        </section>
      </nav>

      {/* Chat Body */}
      <div
        className={`flex-1 flex-col justify-between overflow-y-auto p-3 transition-all duration-300 ease-in-out ${
          isFriendChat ? "block" : "hidden"
        }`}
      >
        <section className="-mx-3 mb-2 flex flex-col items-center border-b border-gray-600 p-5">
          <img
            src={friendChatInfo.profilePicture}
            alt=""
            className="mr-2 h-20 w-20 rounded-full object-cover"
          />
          <h2 className="text-sm font-medium">
            {friendChatInfo.firstName} {friendChatInfo.lastName}
          </h2>
          <p className="font-thin">{friendChatInfo.bio}</p>
          <button
            onClick={() => NavigateToVisitedProfile(friendChatInfo._id)}
            className="mt-2 rounded-xl bg-blue-600 px-3 text-white"
          >
            View Profile
          </button>
        </section>

        <div className="mb-2 flex flex-col overflow-y-auto">
          {chatMessages?.map((message, idx) =>
            message.type === "incomingMessage" ? (
              <IncomingMessage
                key={idx}
                message={message?.message}
                idx={idx}
                user={friendChatInfo}
              />
            ) : (
              <OutgoingMessage
                key={idx}
                message={message?.message}
                idx={idx}
                user={user}
              />
            ),
          )}
        </div>
      </div>

      <footer className="justify-endborder-t flex items-center border-gray-200 p-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-lg bg-BgColor p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
      </footer>
    </div>
  );
}

export default FriendChat;
