/** @format */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../api/chatAPi";
import MessagingHeader from "../components/Messaging/MessagingHeader";
import MessagesFilter from "../components/Messaging/MessagesFilter";
import MessagingList from "../components/Messaging/MessagingList";
import MessagingWindow from "../components/Messaging/MessagingWindow";
import useUser from "../hooks/useUser";
import LoadingSpinner from "../components/util/LoadingSpinner";
import useThemeClasses from "../hooks/useThemeClasses";
import NoChats from "../components/Messaging/NoChats";

function Messaging() {
  const { componentBGColorClass, borderClass } = useThemeClasses();
  const { _id } = useUser();
  const [activeChat, setActiveChat] = useState(null);
  const [friendID, setFriendID] = useState(null);
  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(_id),
    enabled: Boolean(_id),
  });
  const handleActiveChatInfo = (roomID, friendID) => {
    setActiveChat(() => roomID);
    setFriendID(() => friendID);
  };
  console.log(chats);
  if (isLoading) {
    return (
      <div
        className={`${componentBGColorClass} mx-auto flex flex-col justify-center overflow-hidden ${borderClass} px-2 py-2 md:h-[80vh] md:w-[60%] md:rounded-md md:px-5`}
      >
        <LoadingSpinner spinnerSize={20} />;
      </div>
    );
  }

  if (chats.length === 0) {
    return <NoChats />;
  }

  return (
    <div
      className={`mx-auto flex flex-col overflow-hidden ${borderClass} ${componentBGColorClass} px-2 py-4 md:h-[80vh] md:w-[60%] md:rounded-md md:px-5`}
    >
      <MessagingHeader />
      <MessagesFilter />
      <section className="flex h-full flex-1 overflow-hidden">
        <div className="flex-1 md:w-[30%]">
          <MessagingList
            chats={chats}
            isLoading={isLoading}
            handleActiveChatInfo={handleActiveChatInfo}
            activeChat={activeChat}
          />
        </div>

        <div className="hidden md:block md:flex-1">
          <MessagingWindow activeChat={activeChat} friendID={friendID} />
        </div>
      </section>
    </div>
  );
}

export default Messaging;
