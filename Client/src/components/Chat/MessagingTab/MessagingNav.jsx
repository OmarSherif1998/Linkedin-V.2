/** @format */

import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function MessagingNav({
  isMessagingTabOpen,
  user,
  openNewChatTab,
  handleMessagingTabOpen,
}) {
  return (
    <nav
      className={`z-50 mb-1 flex items-center justify-between rounded-t-md border-b bg-white p-2 ${
        isMessagingTabOpen ? "bg-blue-400" : "bg-white text-black"
      }`}
    >
      <section className="flex items-center gap-2">
        <img src={user?.profilePicture} alt="" className="h-8 rounded-full" />
        <p className="font-semibold">Messaging</p>
      </section>
      <section className="flex items-center gap-2">
        <MoreHorizIcon />
        <EditNoteIcon
          fontSize="large"
          onClick={openNewChatTab}
          className="cursor-pointer rounded-full p-1 hover:bg-gray-600 hover:bg-opacity-75"
        />
        {!isMessagingTabOpen ? (
          <KeyboardArrowUpIcon
            className="cursor-pointer rounded-full p-1 hover:bg-gray-200"
            fontSize="large"
            onClick={handleMessagingTabOpen}
          />
        ) : (
          <KeyboardArrowDownIcon
            className="cursor-pointer rounded-full p-1 hover:bg-gray-600 hover:bg-opacity-75"
            fontSize="large"
            onClick={handleMessagingTabOpen}
          />
        )}
      </section>
    </nav>
  );
}

export default MessagingNav;
