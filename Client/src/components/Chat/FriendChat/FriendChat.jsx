/** @format */
import { useRef } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useUser from "../../../hooks/useUser";
import useChatScroll from "../../../hooks/useChatScroll";
import ChatHeader from "./ChatHeader";
import ChatNav from "./ChatNav";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import LoadingSpinner from "../../util/LoadingSpinner";
import useChatMessages from "../../../hooks/useChatMessages";
import useThemeClasses from "../../../hooks/useThemeClasses";
import TypingIndicator from "./TypingIndicator";
import useActiveConnections from "../../../hooks/useActiveConnections";
function FriendChat({
  friendChatInfo = {},
  isFriendChat,
  chatId,
  closeChatTab,
}) {
  const { componentBGColorClass, darkMode, textColorClass } = useThemeClasses();
  const activeConnections = useActiveConnections();
  const scrollContainerRef = useRef(null);
  const chatBottomRef = useRef(null);
  const user = useUser();
  const { NavigateToVisitedProfile } = useNavigation();
  const FriendChatID = chatId;
  const activeStatus = activeConnections?.find(
    (conn) => conn.id === FriendChatID,
  ) || { activeNow: false, lastSeen: null };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleKeyDown,
    isFriendTyping,
    handleTyping,
  } = useChatMessages(friendChatInfo?._id);

  useChatScroll(
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    1.5,
    scrollContainerRef,
    chatBottomRef,
  );
  return (
    <div
      className={`flex h-[400px] w-[320px] ${componentBGColorClass} flex-col overflow-hidden rounded-t-lg border border-gray-300`}
    >
      {/* Header */}
      <ChatNav
        FriendChatID={FriendChatID}
        profilePicture={friendChatInfo.profilePicture}
        firstName={friendChatInfo.firstName}
        lastName={friendChatInfo.lastName}
        name={friendChatInfo.name}
        closeChatTab={closeChatTab}
        activeStatus={activeStatus}
      />

      {/* Body */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 flex-col justify-between overflow-y-auto p-3 transition-all duration-300 ease-in-out ${
          isFriendChat ? "block" : "hidden"
        }`}
      >
        <ChatHeader
          _id={friendChatInfo._id}
          profilePicture={friendChatInfo.profilePicture}
          firstName={friendChatInfo.firstName}
          lastName={friendChatInfo.lastName}
          bio={friendChatInfo.bio}
          NavigateToVisitedProfile={NavigateToVisitedProfile}
          activeStatus={activeStatus}
        />

        <div className="flex flex-col overflow-y-auto">
          {isFetchingNextPage && <LoadingSpinner spinnerSize={5} />}
          {[...(data?.pages || [])]
            .flat()
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message) =>
              message.sender === user._id ? (
                <OutgoingMessage
                  data={message}
                  key={message._id}
                  content={message.content}
                  createdAt={message.createdAt}
                  profilePicture={user.profilePicture}
                  Name={user.firstName + " " + user.lastName}
                />
              ) : (
                <IncomingMessage
                  key={message._id}
                  message={message.content}
                  content={message.content}
                  createdAt={message.createdAt}
                  profilePicture={friendChatInfo.profilePicture}
                  firstName={friendChatInfo.firstName}
                  lastName={friendChatInfo.lastName}
                  msg={message}
                />
              ),
            )}
        </div>

        <TypingIndicator
          isFriendTyping={isFriendTyping}
          friendChatInfo={friendChatInfo}
        />
        <div ref={chatBottomRef} />
      </div>

      <footer
        className={`justify-endborder-t flex items-center border-gray-200 p-2`}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className={`w-full rounded-lg border p-2 text-sm ${textColorClass} focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? `${componentBGColorClass} border-gray-100` : "bg-slate-100"}`}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={handleTyping}
        />
      </footer>
    </div>
  );
}

export default FriendChat;
