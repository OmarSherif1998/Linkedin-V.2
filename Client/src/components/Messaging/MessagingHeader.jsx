import React from "react";
import SearchBar from "./SearchBar";
import EditNoteIcon from "@mui/icons-material/EditNote";

function MessagingHeader() {
  return (
    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
      <section className="flex items-center gap-5">
        <p className="hidden text-base font-semibold text-gray-700 md:block">
          Messaging
        </p>
        <SearchBar />
      </section>
      <EditNoteIcon
        className="cursor-pointer"
        sx={{ fontSize: { xs: 30, md: 30 } }}
      />
    </div>
  );
}

export default MessagingHeader;
