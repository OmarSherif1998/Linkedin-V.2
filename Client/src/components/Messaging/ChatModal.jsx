import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { userTypes } from "../../staticData/userTypes";
import { getUserByID } from "../../api/userAPI";
import useToken from "../../hooks/useToken";
import useChatMessages from "../../hooks/useChatMessages";
import useUser from "../../hooks/useUser";
import useThemeClasses from "../../hooks/useThemeClasses";
import useNavigation from "../../hooks/useNavigation";
import useChatScroll from "../../hooks/useChatScroll";
import LoadingSpinner from "../util/LoadingSpinner";
import useActiveConnections from "../../hooks/useActiveConnections";
import IncomingMessage from "../Chat/FriendChat/IncomingMessage";
import OutgoingMessage from "../Chat/FriendChat/OutgoingMessage";
import TypingIndicator from "../Chat/FriendChat/TypingIndicator";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ChatModal({ friendID, onClose }) {
  const token = useToken();
  const user = useUser();
  const { componentBGColorClass, darkMode, textColorClass } = useThemeClasses();
  const { NavigateToVisitedProfile } = useNavigation();
  const scrollContainerRef = useRef(null);
  const chatBottomRef = useRef(null);
  const activeConnections = useActiveConnections();

  const activeStatus = activeConnections?.find(
    (conn) => conn.id === friendID,
  ) || { activeNow: false, lastSeen: null };

  const { data: friendChatInfo, isLoading: isFriendLoading } = useQuery({
    queryKey: ["friend", friendID],
    queryFn: () => getUserByID(friendID, token, userTypes.BASIC_USER),
    enabled: !!friendID,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleKeyDown,
    handleTyping,
    isFriendTyping,
  } = useChatMessages(friendID);

  useChatScroll(
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    1.5,
    scrollContainerRef,
    chatBottomRef,
  );

  if (isFriendLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <LoadingSpinner spinnerSize={20} />
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full flex-col ${componentBGColorClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <ArrowBackIcon
            className={`${textColorClass} text-lg font-bold`}
            onClick={onClose}
          />

          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => NavigateToVisitedProfile(friendID)}
          >
            <img
              src={friendChatInfo?.profilePicture}
              alt={`${friendChatInfo?.firstName}'s profile`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className={`${textColorClass} font-semibold`}>
                {friendChatInfo?.firstName} {friendChatInfo?.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {activeStatus.activeNow ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Messages */}{" "}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {isFetchingNextPage && <LoadingSpinner spinnerSize={5} />}
          {[...(data?.pages || [])]
            .flat()
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message) =>
              message.sender === user._id ? (
                <OutgoingMessage
                  key={message._id}
                  content={message.content}
                  createdAt={message.createdAt}
                  profilePicture={user.profilePicture}
                  Name={user.firstName + " " + user.lastName}
                  status="read"
                />
              ) : (
                <IncomingMessage
                  key={message._id}
                  content={message.content}
                  createdAt={message.createdAt}
                  profilePicture={friendChatInfo.profilePicture}
                  Name={`${friendChatInfo.firstName} ${friendChatInfo.lastName}`}
                />
              ),
            )}
          <TypingIndicator
            isFriendTyping={isFriendTyping}
            friendChatInfo={friendChatInfo}
          />
          <div ref={chatBottomRef} />
        </div>
      </div>
      {/* Input Footer */}
      <div className="border-t border-gray-200 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className={`w-full rounded-full border p-3 text-sm ${textColorClass} focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? `${componentBGColorClass} border-gray-100`
              : "bg-slate-100"
          }`}
          onKeyDown={handleKeyDown}
          onChange={handleTyping}
        />
      </div>
    </div>
  );
}

export default ChatModal;
