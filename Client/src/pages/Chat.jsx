/** @format */

import React, { useEffect, useState } from "react";
import { useConnections } from "../hooks/useConnections.js";
import ChatWindow from "../components/Chat/ChatWindow.jsx";
import MessagingTab from "../components/Chat/MessagingTab";
import { getUserConnections } from "../api/connectionAPI.js";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveConnections,
  setActiveConnections,
} from "../Redux/sllices/activeConnectionSlice.js";
import { fetchChats } from "../api/chatAPi.js";
import { getSocket } from "../Sockets/Sockets.js";
import { setChats } from "../Redux/sllices/userSlice.js";

const chatRight1920 = [
  "right-[15.2%]",
  "right-[32.4%]",
  "right-[49.5%]",
  "right-[67%]",
];
const chatRight1280 = ["right-[20%]", "right-[42%]", "right-[64%]"];

function Chat() {
  const { _id: userId } = useUser();
  const { checkConnections } = useConnections();
  const [MAX_CHAT_TABS, setMAX_CHAT_TABS] = useState(3);
  const [chatTabs, setChatTabs] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [messagingTabID, setMessagingTabID] = useState([]);
  // const dispatch = useDispatch();
  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => getUserConnections(userId),
    enabled: !!userId, // Only run the query when _id is available
  });
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(userId),
    enabled: !!userId, // Only run the query when _id is available
  });

  useEffect(() => {
    const userConnections = async () => {
      if (!userId) {
        // console.log("User ID is not available");
        return;
      }
      try {
        await checkConnections(userId);
      } catch (error) {
        console.log("CHAT ERROR: Error getting connections", error);
      }
    };
    userConnections();
  }, [userId]);

  const updateWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    const newMaxTabs = screenWidth >= 1920 ? 4 : screenWidth >= 1280 ? 3 : 0;
    if (newMaxTabs !== MAX_CHAT_TABS) {
      setMAX_CHAT_TABS(newMaxTabs);
    }
    if (chatTabs.length > newMaxTabs) {
      setChatTabs((prevTabs) => prevTabs.slice(0, newMaxTabs));
    }
    return () => window.removeEventListener("resize", updateWidth);
  }, [screenWidth]);

  const openNewChatTab = (chatID, componentName, userID) => {
    const isChatAlreadyOpen = chatTabs.some(
      (chatTab) => chatTab.chatID === chatID,
    );

    if (isChatAlreadyOpen) {
      console.log("Chat with this ID is already open.");
      return;
    }

    if (chatTabs.length >= MAX_CHAT_TABS) {
      console.log("Max chat tabs reached:", chatTabs.length);
      return;
    }

    setChatTabs((prevTabs) => [
      ...prevTabs,
      { isOpen: true, chatID, componentName },
    ]);
  };

  const closeChatTab = (chatID) => {
    //	console.log('Close chatID: ', chatID);
    setChatTabs((prevTabs) => prevTabs.filter((tab) => tab.chatID !== chatID)); // Remove the chat tab by index
  };

  return (
    <div>
      <div className={`fixed bottom-0 right-0`}>
        <MessagingTab
          openNewChatTab={openNewChatTab}
          closeChatTab={closeChatTab}
          setMessagingTabID={setMessagingTabID}
          chats={chats}
        />
      </div>

      {chatTabs.map((chat, index) => (
        <div
          key={chat.chatID || `${chat.componentName}-${index}`}
          className={`fixed bottom-0 ${
            screenWidth >= 1920 ? chatRight1920[index] : chatRight1280[index]
          } `}
        >
          {chat.isOpen && (
            <ChatWindow
              openNewChatTab={openNewChatTab}
              connections={connections}
              componentName={chat.componentName}
              chatID={chat.chatID}
              closeChatTab={closeChatTab}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Chat;
