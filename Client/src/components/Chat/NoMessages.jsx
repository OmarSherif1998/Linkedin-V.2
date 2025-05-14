/** @format */

import React from "react";
import noMessage from "../../images/noMessage.svg";
import useThemeClasses from "../../hooks/useThemeClasses";
function NoMessages() {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <div
      className={`flex flex-col items-center gap-5 p-1 ${componentBGColorClass}`}
    >
      <section className="flex flex-col items-center gap-2">
        <img
          src={noMessage}
          alt=""
          className="h-[7rem] w-[7rem] object-contain"
        />
        <h1 className={`${textColorClass} text-2xl`}>No messages yet</h1>
      </section>
      <section className="mb-[5rem] flex flex-col items-center gap-2 text-center">
        <h2 className={`${textColorClass}`}>
          Reach out and start a conversation to advance your career
        </h2>
        <button className="w-fit rounded-full border border-black px-5 text-lg font-thin hover:bg-gray-200 hover:font-normal">
          Send a message
        </button>
      </section>
    </div>
  );
}

export default NoMessages;
