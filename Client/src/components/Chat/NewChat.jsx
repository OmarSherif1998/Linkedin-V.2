/** @format */

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";

function NewChat({
  handleNewChatTabOpen,
  connections,
  handleFriendChat,
  CloseIcon,
  handleChatParticpantsTabOpen,
  closeChatTab,
  chatId,
}) {
  const [newChatID] = useState(chatId);
  const user = useUser();
  const connectionsArray = user.connections;
  console.log(connectionsArray);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["chats"],
  //   queryFn: () => fetchChats(user._id),
  // });
  return (
    <div className="flex w-[320px] flex-col rounded-t-md border border-gray-600 bg-white shadow-xl">
      <nav
        onClick={handleChatParticpantsTabOpen}
        className="z-10 flex items-center justify-between p-2 mb-1 bg-white border-b rounded-t-md"
      >
        <h2 className="text-md">New message </h2>{" "}
        {/* log the chatID next to new message if debugging is needed */}
        <CloseIcon
          fontSize="large"
          className="p-2 rounded-full cursor-pointer hover:bg-gray-200"
          onClick={() => closeChatTab(newChatID)}
        />
      </nav>

      {handleNewChatTabOpen && (
        <div
          className={`overflow-auto transition-all duration-300 ease-in-out ${
            handleNewChatTabOpen ? "max-h-[80vh] min-h-[65vh]" : "max-h-0"
          }`}
        >
          <nav className="flex justify-center gap-2 border-t border-b border-gray-700">
            <input
              type="text"
              placeholder="Search connections"
              className="w-full p-1 bg-transparent border-0"
            />
          </nav>
          <div className="flex flex-col gap-4 p-3 text-gray-600 h-fit">
            <p>Suggested:</p>
            {connections.map((connection, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 hover:bg-gray-00 hover:cursor-pointer"
                onClick={() => handleFriendChat(connection, "NewChat")}
              >
                <img
                  src={connection.profilePicture}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs text-gray-600">
                    {connection.firstName + " " + connection.lastName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewChat;
