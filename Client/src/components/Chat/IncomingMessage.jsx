/** @format */

import React from "react";

function IncomingMessage({ idx, message, user }) {
  return (
    <div className="mb-2 flex items-center gap-1">
      <p
        className="ml-auto rounded-xl rounded-br-none bg-blue-600 px-3 py-1 text-white"
        key={idx}
      >
        {message}
      </p>{" "}
      <img
        src={user.profilePicture}
        alt=""
        className="mr-2 h-8 w-8 rounded-full"
      />
    </div>
  );
}

export default IncomingMessage;
