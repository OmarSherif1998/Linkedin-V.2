/** @format */

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectConnections } from "../../Redux/sllices/connectionSlice";
import UserChat from "./UserChat";

function ChatParticipants({ setIsHandleChatParticipants }) {
  const connections = useSelector(selectConnections);
  const [isChatParticpantsTabOpen, setIsChatParticpantsTabOpen] =
    useState(true);

  //const [UserChatInfo, setIsUserChatInfo] = useState({});

  const handleChatParticpantsTabOpen = () => {
    console.log(isChatParticpantsTabOpen);
    setIsChatParticpantsTabOpen((prevState) => !prevState);
  };
  const handleUserChat = (connection) => {
    setIsHandleChatParticipants(false);
    //setIsUserChatInfo(connection);
  };
  //console.log(connections);
  return (
    <div className="flex w-[25rem] flex-col rounded-t-md border border-gray-600 bg-white shadow-xl">
      <nav
        onClick={handleChatParticpantsTabOpen}
        className="z-10 mb-1 flex items-center justify-between rounded-t-md border-b bg-white p-2"
      >
        <h2 className="text-md">New message</h2>
        <CloseIcon
          fontSize="large"
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
          onClick={() => setIsHandleChatParticipants(false)}
        />
      </nav>

      {isChatParticpantsTabOpen && (
        <div
          className={`overflow-auto transition-all duration-300 ease-in-out ${
            isChatParticpantsTabOpen ? "max-h-[80vh] min-h-[65vh]" : "max-h-0"
          }`}
        >
          <nav className="flex justify-center gap-2 border-b border-t border-gray-700">
            <input
              type="text"
              placeholder="Type a name"
              className="w-full border-0 bg-transparent p-1"
            />
          </nav>
          <div className="flex h-fit flex-col gap-4 p-3 text-gray-600">
            <p>Suggested:</p>
            {connections.map((connection, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-200"
                onClick={() => handleUserChat(connection)}
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
      {/* : (<UserChat ChatInfo={UserChatInfo} />) */}
    </div>
  );
}

export default ChatParticipants;
