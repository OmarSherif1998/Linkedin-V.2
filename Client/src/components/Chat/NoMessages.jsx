/** @format */

import React from "react";
import noMessage from "../../images/noMessage.svg";
function NoMessages() {
  return (
    <div className="flex flex-col items-center gap-5 p-1">
      <section className="flex flex-col items-center gap-2">
        <img
          src={noMessage}
          alt=""
          className="h-[7rem] w-[7rem] object-contain"
        />
        <h1 className="text-2xl">No messages yet</h1>
      </section>
      <section className="mb-[5rem] flex flex-col items-center gap-2 text-center">
        <h2>Reach out and start a conversation to advance your career</h2>
        <button className="w-fit rounded-full border border-black px-5 text-lg font-thin hover:bg-gray-200 hover:font-normal">
          Send a message
        </button>
      </section>
    </div>
  );
}

export default NoMessages;
