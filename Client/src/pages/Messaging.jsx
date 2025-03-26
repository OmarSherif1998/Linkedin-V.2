/** @format */

import React from "react";
import MessagingHeader from "../components/Messaging/MessagingHeader";
import MessagesFilter from "../components/Messaging/MessagesFilter";
import MessagingList from "../components/Messaging/MessagingList";
import Messagingwindow from "../components/Messaging/Messagingwindow";
function Messaging() {
  return (
    <div className="mx-auto flex flex-col bg-white px-2 py-2 md:w-[50%] md:rounded-md md:px-5">
      <MessagingHeader />

      <MessagesFilter />
      <section>
        <MessagingList />
        <Messagingwindow />
      </section>
    </div>
  );
}

export default Messaging;
