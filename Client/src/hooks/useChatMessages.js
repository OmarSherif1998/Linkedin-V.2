import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHistoricalMessages } from "../api/chatAPi";
import generateRandomId from "../functions/generateRandomId";
import { getSocket } from "../Sockets/Sockets";
import useUser from "./useUser";
import roomIdGenearator from "../functions/roomIdGenearator";
import { roomHandler } from "../Sockets/handlers/roomHandler";
import { typingEmitters } from "../Sockets/handlers/typingEmitters";
import { typingReceiver } from "../Sockets/handlers/typingReceiver";
import queryClient from "../functions/queryClient";

export default function useChatMessages(friendId) {
  const socket = getSocket("useChatMessages");
  const { _id } = useUser();
  const roomId = roomIdGenearator(_id, friendId);

  const typingTimeoutRef = useRef(null);
  const isCurrentlyTyping = useRef(false);
  const [isFriendTyping, setIsFriendTyping] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["userChat", roomId],
      queryFn: ({ pageParam = 1 }) =>
        getHistoricalMessages({ pageParam, roomId }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 20) return undefined;
        return allPages.length + 1;
      },
    });

  const handleTyping = () => {
    typingEmitters(socket, roomId, _id, isCurrentlyTyping, typingTimeoutRef);
  };

  // Handle typing and sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const outgoingMessage = e.target.value.trim();
      if (!outgoingMessage) return;

      const tempMessage = {
        _id: generateRandomId(),
        content: outgoingMessage,
        sender: _id,
        status: "sending",
        createdAt: new Date().toISOString(),
      };

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

      e.target.value = "";

      socket.emit(
        "sentMessage",
        roomId,
        outgoingMessage,
        _id,
        friendId,
        (serverResponse = true) => {
          if (serverResponse) {
            queryClient.setQueryData(["userChat", roomId], (oldData) => {
              if (!oldData) return oldData;

              const updatedPages = oldData.pages.map((page) =>
                page.map((msg) =>
                  msg._id === tempMessage._id
                    ? { ...msg, ...serverResponse.message, status: "sent" }
                    : msg,
                ),
              );

              return { ...oldData, pages: updatedPages };
            });
          } else {
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

  // Receive real-time messages from the server
  useEffect(() => {
    if (!socket) return;
    const cleanupRoom = roomHandler(socket, roomId);

    const handleReceiveMessage = (incomingMessage) => {
      console.log(incomingMessage);
      if (incomingMessage.roomId !== roomId) return;

      queryClient.setQueryData(["userChat", roomId], (oldData) => {
        if (!oldData) return oldData;

        const lastPage = [...oldData.pages[oldData.pages.length - 1]];
        lastPage.push(incomingMessage);

        const updatedPages = [...oldData.pages];
        updatedPages[oldData.pages.length - 1] = lastPage;

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    };

    socket.on("receivedMessage", handleReceiveMessage);

    return () => {
      socket.off("receivedMessage", handleReceiveMessage);
      cleanupRoom();
    };
  }, [socket, roomId, queryClient]);

  useEffect(() => {
    if (!socket) return;
    const cleanupTypingReceiver = typingReceiver(
      socket,
      _id,
      setIsFriendTyping,
    );

    return () => {
      cleanupTypingReceiver();
    };
  }, [socket, _id]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleKeyDown,
    handleTyping,
    isFriendTyping,
  };
}
