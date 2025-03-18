/** @format */

import React, { useState } from "react";

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
  // console.log(connections);
  return (
    <div className="flex w-[320px] flex-col rounded-t-md border border-gray-600 bg-white shadow-xl">
      <nav
        onClick={handleChatParticpantsTabOpen}
        className="z-10 mb-1 flex items-center justify-between rounded-t-md border-b bg-white p-2"
      >
        <h2 className="text-md">New message </h2>{" "}
        {/* log the chatID next to new message if debugging is needed */}
        <CloseIcon
          fontSize="large"
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
          onClick={() => closeChatTab(newChatID)}
        />
      </nav>

      {handleNewChatTabOpen && (
        <div
          className={`overflow-auto transition-all duration-300 ease-in-out ${
            handleNewChatTabOpen ? "max-h-[80vh] min-h-[65vh]" : "max-h-0"
          }`}
        >
          <nav className="flex justify-center gap-2 border-b border-t border-gray-700">
            <input
              type="text"
              placeholder="Search connections"
              className="w-full border-0 bg-transparent p-1"
            />
          </nav>
          <div className="flex h-fit flex-col gap-4 p-3 text-gray-600">
            <p>Suggested:</p>
            {connections.map((connection, index) => (
              <div
                key={index}
                className="hover:bg-gray-00 flex items-center gap-2 p-2 hover:cursor-pointer"
                onClick={() => handleFriendChat(connection, "NewChat")}
              >
                <img
                  src={connection.profilePicture}
                  alt=""
                  className="h-12 w-12 rounded-full"
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
