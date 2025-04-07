/** @format */

import React, { useEffect } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FocusButton from "../Buttons/FocusButton";
import OtherButton from "../Buttons/OtherButton";
import NoMessages from "./NoMessages";
import ChatList from "./ChatList";
import SearchButton from "../Buttons/SearchButton";
import { useChat } from "../../hooks/useChat";
import { fetchChats } from "../../api/chatAPi";
import { useUser } from "../../hooks/useUser";
function MessagingTab({ openNewChatTab, closeChatTab, setMessagingTabID }) {
  const {
    handleMessagingTabOpen,
    handleFocusChange,
    handleOtherChange,
    setFriendsList,
    isMessagingTabOpen,
    isFocused,
    isOther,
    friendsList,
  } = useChat();

  const user = useUser();
  const MessagingTabID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  useEffect(() => {
    const getChats = async () => {
      const response = await fetchChats(user._id);
      const data = response;
      setFriendsList(data);
    };
    getChats();
  }, []);
  return (
    <div className="grid w-[18rem] grid-rows-[auto_1fr] rounded-t-md bg-white shadow-xl">
      <nav
        className={`z-50 mb-1 flex items-center justify-between rounded-t-md border-b bg-white p-2 ${
          isMessagingTabOpen ? "bg-blue-00" : "bg-white text-black"
        }`}
      >
        <section className="flex items-center gap-2">
          <img
            src={user?.profilePicture}
            alt=""
            className="object-contain border rounded-full size-9"
          />
          <p className="font-semibold">Messaging</p>
        </section>
        <section className="flex items-center gap-2">
          <MoreHorizIcon />
          <EditNoteIcon
            fontSize="large"
            onClick={() => {
              setMessagingTabID((prevMessagingID) => [
                ...prevMessagingID,
                MessagingTabID,
              ]);
              openNewChatTab(MessagingTabID, "MessagingTab");
            }}
            className="p-1 rounded-full cursor-pointer hover:bg-gray-600 hover:bg-opacity-75"
          />
          {!isMessagingTabOpen ? (
            <KeyboardArrowUpIcon
              className="p-1 rounded-full cursor-pointer hover:bg-gray-200"
              fontSize="large"
              onClick={handleMessagingTabOpen}
            />
          ) : (
            <KeyboardArrowDownIcon
              className="p-1 rounded-full cursor-pointer hover:bg-gray-600 hover:bg-opacity-75"
              fontSize="large"
              onClick={handleMessagingTabOpen}
            />
          )}
        </section>
      </nav>

      <section
        className={`overflow-auto transition-all duration-300 ease-in-out ${
          isMessagingTabOpen ? "max-h-[90vh] min-h-[65vh]" : "max-h-0"
        }`}
      >
        <SearchButton />

        <section className="flex mt-2">
          <FocusButton
            handleFocusChange={handleFocusChange}
            isFocused={isFocused}
          />
          <OtherButton
            handleOtherChange={handleOtherChange}
            isOther={isOther}
          />
        </section>
        <div className="flex flex-col gap-4 h-fit">
          {friendsList.length === 0 ? (
            <NoMessages />
          ) : (
            <ChatList
              MessagingTabID={MessagingTabID}
              friendsList={friendsList}
              closeChatTab={closeChatTab}
              openNewChatTab={openNewChatTab}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default MessagingTab;
