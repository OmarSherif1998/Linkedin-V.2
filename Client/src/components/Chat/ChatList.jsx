/** @format */

import React from "react";

function ChatList({ friendsList, openNewChatTab }) {
  // console.log(friendsList);
  return (
    <div>
      {friendsList?.map((friend, idx) => (
        <div
          className="flex w-full cursor-pointer items-center gap-3 p-3 hover:bg-gray-200"
          key={idx}
          onClick={() => {
            openNewChatTab(friend._id, "ChatList");
          }}
        >
          <img
            src={friend.profilePicture}
            alt=""
            className="size-8 rounded-full object-cover"
          />
          {friend.name}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
