import React from "react";
import SearchBar from "./SearchBar";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useThemeClasses from "../../hooks/useThemeClasses";
function MessagingHeader() {
  const { textColorClass, hoverColorClass, darkMode, iconColorClass } =
    useThemeClasses();
  return (
    <div
      className={`flex items-center justify-between border-b border-gray-100 pb-1`}
    >
      <section className={`flex items-center gap-5`}>
        <p
          className={`${darkMode ? textColorClass : "text-gray-700"} hidden text-base font-semibold md:block`}
        >
          Messaging
        </p>
        <SearchBar />
      </section>
      <section className="flex gap-1">
        <MoreHorizIcon
          className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
          sx={{ fontSize: { xs: 30, md: 30 } }}
          style={{ color: iconColorClass }}
        />
        <EditNoteIcon
          className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
          sx={{ fontSize: { xs: 30, md: 30 } }}
          style={{ color: iconColorClass }}
        />
      </section>
    </div>
  );
}

export default MessagingHeader;
