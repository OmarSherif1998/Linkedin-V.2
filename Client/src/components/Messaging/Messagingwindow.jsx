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
import useScroll from "../../hooks/useScroll";
import { useRef } from "react";
import MessagingInputBar from "./MessagingInputBar";
import useThemeClasses from "../../hooks/useThemeClasses";

function MessagingWindow({ activeChat, friendID }) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();
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

  // useScroll(
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   1.5,
  //   friendID,
  // );

  const { data: friendChatInfo, isLoading: isFriendLoading } = useQuery({
    queryKey: ["friend", friendID],
    queryFn: () => getUserByID(friendID, token, userTypes.BASIC_USER),
    enabled: !!friendID,
    staleTime: Infinity, // Never consider stale
    cacheTime: 1000 * 60 * 60, // 1 hour cache
    refetchOnWindowFocus: false,
  });

  // const [isInitialLoad, setIsInitialLoad] = useState(false);
  // console.log("MessagingWindow mounted");
  // console.log("AC: ", activeChat);
  // In MessagingWindow.jsx
  // console.log("Render caused by:", {
  //   data: data?.length,
  //   activeChat,
  //   friendID,
  //   isFriendLoading,
  // });
  // // Add mutation observer to track ref element
  // useEffect(() => {
  //   if (!chatBottomRef.current) return;

  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.removedNodes.contains(chatBottomRef.current)) {
  //         console.log("REF ELEMENT WAS REMOVED FROM DOM");
  //       }
  //     });
  //   });

  //   observer.observe(chatBottomRef.current.parentNode, {
  //     childList: true,
  //     subtree: true,
  //   });

  //   return () => observer.disconnect();
  // }, []);

  // useEffect(() => {
  //   if (!data) return;

  //   // Use requestAnimationFrame instead of setTimeout for better timing
  //   const scrollFrame = requestAnimationFrame(() => {
  //     if (chatBottomRef.current) {
  //       chatBottomRef.current.scrollIntoView({ behavior: "instant" });
  //     }
  //   });

  //   // Add cleanup to prevent stale effects
  //   return () => cancelAnimationFrame(scrollFrame);
  // }, [data, activeChat]); // Add friendID to dependencies
  // useLayoutEffect(() => {
  //   console.log("chatBottomRef in useLayoutEffect:", chatBottomRef.current);
  // }, [data, activeChat, friendID]);

  if (isFriendLoading) {
    return <LoadingSpinner spinnerSize={10} />;
  }

  return (
    <div className="flex flex-col w-full h-full border">
      {activeChat && (
        <header
          className={`${componentBGColorClass} sticky top-0 z-10 flex items-center gap-3 border-b ${hoverColorClass} ${textColorClass} p-3`}
        >
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
                      updatedAt={message.updatedAt}
                      profilePicture={friendChatInfo?.profilePicture}
                      firstName={friendChatInfo?.firstName}
                      lastName={friendChatInfo?.lastName}
                    />
                  </div>
                ),
              )}
          </div>
        )}

        <div
          ref={chatBottomRef}
          className="invisible h-px"
          aria-hidden="true"
        />
      </div>

      {activeChat === null ? null : (
        <MessagingInputBar handleKeyDown={handleKeyDown} />
      )}
    </div>
  );
}

export default MessagingWindow;
