import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getHistoricalMessages } from "../api/chatAPi";
import generateRandomId from "../functions/generateRandomId";
import { initializeSocket } from "../Sockets/Sockets";
import { useUser } from "./useUser";
import roomIdGenearator from "../functions/roomIdGenearator";

export default function useChatMessages(friendId) {
  const queryClient = useQueryClient();
  const socket = initializeSocket();
  const { _id } = useUser();
  const roomId = roomIdGenearator(_id, friendId);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const outgoingMessage = e.target.value.trim();
      if (!outgoingMessage) return;

      // Generate a temporary message with a unique ID
      const tempMessage = {
        _id: generateRandomId(),
        content: outgoingMessage, // Ensure this matches your message structure
        sender: _id,
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
        _id,
        friendId,
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

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleKeyDown,
  };
}
