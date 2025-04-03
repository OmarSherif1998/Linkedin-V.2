/** @format */

import MessagingHeader from "../components/Messaging/MessagingHeader";
import MessagesFilter from "../components/Messaging/MessagesFilter";
import MessagingList from "../components/Messaging/MessagingList";
import MessagingWindow from "../components/Messaging/MessagingWindow";
import { useUser } from "../hooks/useUser";
function Messaging() {
  const user = useUser();
  console.log("user:", user);
  return (
    <div className="mx-auto flex flex-col bg-white px-2 py-2 md:w-[60%] md:rounded-md md:px-5">
      <MessagingHeader />
      <MessagesFilter />
      <section className="flex">
        <div className="flex-1 bg-black md:w-[30%]">
          <MessagingList />
        </div>

        <div className="hidden bg-red-600 md:block md:flex-1">
          <MessagingWindow />
        </div>
      </section>
    </div>
  );
}

export default Messaging;
