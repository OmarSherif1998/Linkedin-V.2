import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchChats } from "../../api/chatAPi";
import { useUser } from "../../hooks/useUser";

function MessagingList() {
  const user = useUser();
  // console.log("user:", user);
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(user._id),
  });
  return <div className="w-full">MessagingList</div>;
}

export default MessagingList;
