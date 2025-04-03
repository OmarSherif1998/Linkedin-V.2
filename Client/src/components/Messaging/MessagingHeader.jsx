import React from "react";
import SearchBar from "./SearchBar";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function MessagingHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-1">
      <section className="flex items-center gap-5">
        <p className="hidden text-base font-semibold text-gray-700 md:block">
          Messaging
        </p>
        <SearchBar />
      </section>
      <section className="flex gap-1">
        <MoreHorizIcon
          className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-50 hover:text-black"
          sx={{ fontSize: { xs: 30, md: 30 } }}
        />
        <EditNoteIcon
          className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-50 hover:text-black"
          sx={{ fontSize: { xs: 30, md: 30 } }}
        />
      </section>
    </div>
  );
}

export default MessagingHeader;
