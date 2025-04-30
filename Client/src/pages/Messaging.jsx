/** @format */
import { useState } from "react";
import MessagingHeader from "../components/Messaging/MessagingHeader";
import MessagesFilter from "../components/Messaging/MessagesFilter";
import MessagingList from "../components/Messaging/MessagingList";
import MessagingWindow from "../components/Messaging/MessagingWindow";
function Messaging() {
  const [activeChat, setActiveChat] = useState(null);
  const [friendID, setFriendID] = useState(null);

  const handleActiveChatInfo = (roomID, friendID) => {
    setActiveChat(roomID);
    setFriendID(friendID);
  };
  return (
    <div className="mx-auto flex flex-col overflow-hidden border bg-white px-2 py-2 md:h-[80vh] md:w-[60%] md:rounded-md md:px-5">
      <MessagingHeader />
      <MessagesFilter />
      <section className="flex flex-1 h-full overflow-hidden">
        <div className="flex-1 md:w-[30%]">
          <MessagingList
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
