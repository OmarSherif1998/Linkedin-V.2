import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchChats } from "../../api/chatAPi";
import { useUser } from "../../hooks/useUser";
import { formatTimeToHHMM } from "../../functions/formatTimeToHHMM";
import LoadingSpinner from "../util/LoadingSpinner";

function MessagingList({ handleActiveChatInfo, activeChat }) {
  const { _id } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(_id),
    enabled: _id !== null,
  });

  useEffect(() => {
    if (data) {
      handleActiveChatInfo(data[0].roomID, data[0]._id);
    }
  }, []);
  return (
    <div className="h-[68vh] w-full overflow-y-auto border border-r-0">
      {isLoading ? (
        <LoadingSpinner spinnerSize={10} />
      ) : (
        data?.map((chat) => {
          return (
            <div
              onClick={() => {
                handleActiveChatInfo(chat.roomID, chat._id);
              }}
              key={chat._id}
              className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-all hover:bg-gray-300 ${activeChat === chat.roomID ? "border-l-2 border-green-500 bg-gray-200" : null}`}
            >
              <img
                src={chat.profilePicture}
                alt={chat.name}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div className="flex flex-col flex-1 pb-2 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold text-black">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatTimeToHHMM(chat.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MessagingList;
