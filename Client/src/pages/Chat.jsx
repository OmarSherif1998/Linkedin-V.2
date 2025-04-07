/** @format */

import React, { useEffect, useState } from "react";
import { useConnections } from "../hooks/useConnections.js";
import ChatWindow from "../components/Chat/ChatWindow.jsx";
import MessagingTab from "../components/Chat/MessagingTab";
import { getUserConnections } from "../api/connectionAPI.js";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../hooks/useUser.js";

const chatRight1920 = [
  "right-[15.2%]",
  "right-[32.5%]",
  "right-[50%]",
  "right-[67%]",
];
const chatRight1280 = ["right-[23%]", "right-[48.5%]", "right-[74%]"];

function Chat() {
  const { checkConnections } = useConnections();
  const [MAX_CHAT_TABS, setMAX_CHAT_TABS] = useState(3);
  const user = useUser();
  const [chatTabs, setChatTabs] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [messagingTabID, setMessagingTabID] = useState([]);

  const { data: connections } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getUserConnections(user._id),
  });

  useEffect(() => {
    const userConnections = async () => {
      if (!user?._id) {
        console.log("User ID is not available");
        return;
      }
      try {
        await checkConnections(user?._id);
      } catch (error) {
        console.log("CHAT ERROR: Error getting connections", error);
      }
    };
    userConnections();
  }, []);

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
      <div className="fixed bottom-0 right-0">
        <MessagingTab
          openNewChatTab={openNewChatTab}
          closeChatTab={closeChatTab}
          setMessagingTabID={setMessagingTabID}
        />
      </div>

      {chatTabs.map((chat, index) => (
        <div
          key={chat.chatID}
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
