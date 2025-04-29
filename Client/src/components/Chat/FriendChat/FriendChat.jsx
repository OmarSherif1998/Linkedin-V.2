/** @format */

import { initializeSocket } from "../../../Sockets/Sockets";
import { getHistoricalMessages } from "../../../api/chatAPi";
import { useNavigation } from "../../../hooks/useNavigation";
import { useUser } from "../../../hooks/useUser";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import roomIdGenearator from "../../../functions/roomIdGenearator";
import generateRandomId from "../../../functions/generateRandomId";
import useChatScroll from "../../../hooks/useChatScroll";
import ChatHeader from "./ChatHeader";
import ChatNav from "./ChatNav";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import LoadingSpinner from "../../util/LoadingSpinner";
import useChatMessages from "../../../hooks/useChatMessages";

function FriendChat({
  friendChatInfo = {},
  isFriendChat,
  chatId,
  closeChatTab,
}) {
  const socket = initializeSocket();
  const user = useUser();
  const queryClient = useQueryClient();
  const { NavigateToVisitedProfile } = useNavigation();
  const FriendChatID = chatId;
  const roomId = roomIdGenearator(user?._id, friendChatInfo?._id);
  // const messages = useChatMessages(roomId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["userChat", roomId],
      queryFn: ({ pageParam = 1 }) =>
        getHistoricalMessages({ pageParam, roomId }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 20) return undefined; // No more pages if less than 20 messages
        return allPages.length + 1; // Next page number
      },
    });

  const { chatBottomRef, scrollContainerRef } = useChatScroll(
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    1.5,
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const outgoingMessage = e.target.value.trim();
      if (!outgoingMessage) return;

      // Generate a temporary message with a unique ID
      const tempMessage = {
        _id: generateRandomId(),
        content: outgoingMessage, // Ensure this matches your message structure
        sender: user._id,
        status: "sending",
        createdAt: new Date().toISOString(),
      };

      // Optimistic UI update: Add the temp message to the chat
      queryClient.setQueryData(["userChat", roomId], (oldData) => {
        if (!oldData) return oldData;

        const lastPage = [...oldData.pages[oldData.pages.length - 1]];
        lastPage.push(tempMessage);

        const updatedPages = [...oldData.pages];
        updatedPages[oldData.pages.length - 1] = lastPage;

        return {
          ...oldData,
          pages: updatedPages,
        };
      });

      // Clear the input
      e.target.value = "";

      // Send the message via socket
      socket.emit(
        "sentMessage",
        roomId,
        outgoingMessage,
        user._id,
        friendChatInfo._id,
        (serverResponse = true) => {
          if (serverResponse) {
            // Replace the temp message with the server's confirmed message
            console.log(serverResponse);
            queryClient.setQueryData(["userChat", roomId], (oldData) => {
              if (!oldData) return oldData;

              const updatedPages = oldData.pages.map((page) =>
                page.map((msg) =>
                  msg._id === tempMessage._id
                    ? { ...msg, ...serverResponse.message, status: "sent" } // Merge with server data
                    : msg,
                ),
              );

              return { ...oldData, pages: updatedPages };
            });
          } else {
            // Mark the message as failed
            console.log("@", serverResponse);

            queryClient.setQueryData(["userChat", roomId], (oldData) => {
              const updatedPages = oldData.pages.map((page) =>
                page.map((msg) =>
                  msg._id === tempMessage._id
                    ? { ...msg, status: "failed" }
                    : msg,
                ),
              );
              return { ...oldData, pages: updatedPages };
            });
          }
        },
      );
    }
  };

  return (
    <div className="flex h-[400px] w-[320px] flex-col overflow-hidden rounded-t-lg border border-gray-300 bg-white shadow-lg">
      {/* Header */}
      <ChatNav
        FriendChatID={FriendChatID}
        profilePicture={friendChatInfo.profilePicture}
        firstName={friendChatInfo.firstName}
        lastName={friendChatInfo.lastName}
        name={friendChatInfo.name}
        closeChatTab={closeChatTab}
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
        />

        <div className="flex flex-col overflow-y-auto">
          {isFetchingNextPage && <LoadingSpinner />}
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
                />
              ),
            )}
        </div>

        <div ref={chatBottomRef} />
      </div>

      <footer className="justify-endborder-t flex items-center border-gray-200 p-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-lg bg-BgColor p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
      </footer>
    </div>
  );
}

export default FriendChat;
