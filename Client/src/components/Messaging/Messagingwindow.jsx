import { useRef } from "react";
import { useUser } from "../../hooks/useUser";
import { useNavigation } from "../../hooks/useNavigation";
import { useQuery } from "@tanstack/react-query";
import { userTypes } from "../../staticData/userTypes";
import { getUserByID } from "../../api/userAPI";
import useToken from "../../hooks/useToken";
import useChatMessages from "../../hooks/useChatMessages";
import LoadingSpinner from "../util/LoadingSpinner";
import OutgoingMessage from "../Chat/FriendChat/OutgoingMessage";
import IncomingMessage from "../Chat/FriendChat/IncomingMessage";
import useChatScroll from "../../hooks/useChatScroll";

function MessagingWindow({ activeChat, friendID }) {
  const scrollContainerRef = useRef(null);
  const chatBottomRef = useRef(null);
  const token = useToken();
  const { NavigateToVisitedProfile } = useNavigation();
  const { _id, profilePicture, firstName, lastName } = useUser();
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    handleKeyDown,
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

  const { data: friendChatInfo, isLoading: isFriendLoading } = useQuery({
    queryKey: ["friend", friendID],
    queryFn: () => getUserByID(friendID, token, userTypes.BASIC_USER),
    enabled: !!friendID,
    staleTime: Infinity, // Never consider stale
    cacheTime: 1000 * 60 * 60, // 1 hour cache
    refetchOnWindowFocus: false,
  });

  console.log(chatBottomRef);

  if (isFriendLoading) {
    return <LoadingSpinner spinnerSize={10} />;
  }
  return (
    <div className="flex h-[68vh] w-full flex-col border">
      {activeChat && (
        <header className="sticky top-0 z-10 flex items-center gap-3 p-3 bg-white border-b border-gray-200">
          {friendChatInfo?.profilePicture && (
            <img
              onClick={() => NavigateToVisitedProfile(friendID)}
              src={friendChatInfo.profilePicture}
              alt={`${friendChatInfo.firstName}'s profile`}
              className="object-cover border rounded-full cursor-pointer size-12"
            />
          )}
          <button
            className="flex flex-col items-start"
            onClick={() => NavigateToVisitedProfile(friendID)}
          >
            <h2 className="font-semibold cursor-pointer">
              {friendChatInfo?.firstName} {friendChatInfo?.lastName}
            </h2>
            <p className="text-xs text-gray-500">
              {friendChatInfo?.bio || "Active now"}
            </p>
          </button>
        </header>
      )}

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {activeChat === null ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {/* Loading indicator when fetching older messages */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-2">
                <LoadingSpinner />
              </div>
            )}

            {[...(data?.pages || [])]
              .flat()
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message) =>
                message.sender === _id ? (
                  <div key={message._id} className="flex justify-end">
                    <OutgoingMessage
                      data={message}
                      content={message.content}
                      createdAt={message.createdAt}
                      profilePicture={profilePicture}
                      Name={`${firstName} ${lastName}`}
                    />
                  </div>
                ) : (
                  <div key={message._id} className="flex justify-start">
                    <IncomingMessage
                      message={message.content}
                      content={message.content}
                      createdAt={message.createdAt}
                      profilePicture={friendChatInfo?.profilePicture}
                      firstName={friendChatInfo?.firstName}
                      lastName={friendChatInfo?.lastName}
                    />
                  </div>
                ),
              )}
            <div
              ref={chatBottomRef}
              className="invisible h-px"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 p-3 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 text-sm border rounded-lg bg-BgColor focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleKeyDown}
          />
        </div>
      </footer>
    </div>
  );
}

export default MessagingWindow;
