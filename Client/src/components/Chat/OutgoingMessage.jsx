/** @format */

import React from "react";

function OutgoingMessage({ idx, message, user }) {
  return (
    <div className="mb-2 flex items-center">
      <img
        src={user.profilePicture}
        alt=""
        className="mr-2 h-8 w-8 rounded-full"
      />
      <p className="rounded-xl rounded-bl-none bg-gray-200 px-3 py-1" key={idx}>
        {message}
      </p>{" "}
    </div>
  );
}

export default OutgoingMessage;
