/** @format */

import React, { useState } from "react";
import useThemeClasses from "../../../../hooks/useThemeClasses";
import NewChatNav from "./NewChatNav";
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
  const { componentBGColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} flex w-[320px] flex-col rounded-t-md border border-gray-600 shadow-xl`}
      key={newChatID}
    >
      <NewChatNav
        handleChatParticpantsTabOpen={handleChatParticpantsTabOpen}
        CloseIcon={CloseIcon}
        closeChatTab={closeChatTab}
        newChatID={newChatID}
      />

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
            {connections?.length > 0 ? (
              connections.map((connection) => (
                <div
                  key={connection._id} // Unique identifier
                  className={`${hoverColorClass} flex items-center gap-2 p-2 hover:cursor-pointer`}
                  onClick={() => {
                    openNewChatTab(connection._id, "ChatList");
                    closeChatTab(newChatID);
                  }}
                >
                  <img
                    src={connection.profilePicture}
                    alt={`${connection.firstName}'s profile`}
                    className="h-12 w-12 rounded-full"
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
