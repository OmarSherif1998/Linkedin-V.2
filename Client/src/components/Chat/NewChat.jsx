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
  openNewChatTab,
}) {
  const [newChatID] = useState(chatId);

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
            {connections.length > 0 ? (
              connections.map((connection) => (
                <div
                  key={connection._id} // Unique identifier
                  className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    openNewChatTab(connection._id, "ChatList");
                    closeChatTab(newChatID);
                  }}
                >
                  <img
                    src={connection.profilePicture}
                    alt={`${connection.firstName}'s profile`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs text-gray-600">
                      {`${connection.firstName} ${connection.lastName}`}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500">No connections found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewChat;

// () => handleFriendChat(connection, "NewChat")
