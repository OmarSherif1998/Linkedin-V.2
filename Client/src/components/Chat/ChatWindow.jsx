/** @format */

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FriendChat from "./FriendChat";
import NewChat from "./NewChat";

function ChatWindow({
  closeChatTab,
  chatID,
  componentName,
  connections,
  openNewChatTab,
}) {
  const [friendChatInfo, setFriendChatInfo] = useState(null);
  const [isFriendChat, setIsFriendChat] = useState(false);
  const [newChatTabOpen, setNewChatTabOpen] = useState(true);

  useEffect(() => {
    const friend = connections.find((conn) => conn._id === chatID); // Use find instead of filter
    setFriendChatInfo(friend || null); // Set to null if no match is found

    if (componentName === "ChatList") {
      setIsFriendChat(true);
    }
  }, [connections, chatID, componentName]); // Add dependencies for proper reactivity

  const handleNewChatTabOpen = () => {
    setNewChatTabOpen((prevState) => !prevState);
  };

  const handleFriendChat = (friendData) => {
    setIsFriendChat(true);
    setFriendChatInfo(friendData);
  };

  return (
    <div>
      {isFriendChat ? (
        <FriendChat
          friendChatInfo={friendChatInfo}
          isFriendChat={isFriendChat}
          CloseIcon={CloseIcon}
          closeChatTab={closeChatTab}
          chatId={chatID}
        />
      ) : (
        <NewChat
          openNewChatTab={openNewChatTab}
          connections={connections}
          newChatTabOpen={newChatTabOpen}
          handleNewChatTabOpen={handleNewChatTabOpen}
          CloseIcon={CloseIcon}
          closeChatTab={closeChatTab}
          handleFriendChat={handleFriendChat}
          chatId={chatID}
        />
      )}
    </div>
  );
}

export default ChatWindow;
