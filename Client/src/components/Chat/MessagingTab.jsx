/** @format */

import React, { useEffect } from "react";

import MessagingNav from "./MessagingTab/MessagingNav";
import FocusButton from "../Buttons/FocusButton";
import OtherButton from "../Buttons/OtherButton";
import NoMessages from "./NoMessages";
import ChatList from "./ChatList";
import SearchButton from "../Buttons/SearchButton";
import { useChat } from "../../hooks/useChat";
import { fetchChats } from "../../api/chatAPi";
import useUser from "../../hooks/useUser";
import useThemeClasses from "../../hooks/useThemeClasses";
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
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const user = useUser();
  const MessagingTabID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  useEffect(() => {
    const getChats = async () => {
      const response = await fetchChats(user._id);
      const data = response;
      setFriendsList(data);
    };
    getChats();
  }, [user._id]);
  return (
    <div
      className={`${componentBGColorClass} grid w-[18rem] grid-rows-[auto_1fr] rounded-t-md shadow-xl`}
    >
      <MessagingNav
        isMessagingTabOpen={isMessagingTabOpen}
        user={user}
        openNewChatTab={openNewChatTab}
        handleMessagingTabOpen={handleMessagingTabOpen}
      />

      <section
        className={`overflow-auto transition-all duration-100 ease-in-out ${
          isMessagingTabOpen ? "max-h-[90vh] min-h-[65vh]" : "max-h-0"
        }`}
      >
        <SearchButton />

        <section className={`${textColorClass} mt-2 flex`}>
          <FocusButton
            handleFocusChange={handleFocusChange}
            isFocused={isFocused}
          />
          <OtherButton
            handleOtherChange={handleOtherChange}
            isOther={isOther}
          />
        </section>
        <div className="flex h-fit flex-col gap-4">
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
