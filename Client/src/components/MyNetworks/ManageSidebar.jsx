/** @format */

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TagIcon from "@mui/icons-material/Tag";
const buttons = [
  { text: "Connections", icon: <PeopleIcon /> },
  { text: "Contacts", icon: <PersonIcon /> },
  { text: "Following & Followers", icon: <ImportContactsIcon /> },
  { text: "Groups", icon: <GroupsIcon /> },
  { text: "Events", icon: <CalendarMonthIcon /> },
  { text: "Pages", icon: <ArticleIcon /> },
  { text: "Newsletter", icon: <NewspaperIcon /> },
  { text: "Hashtag", icon: <TagIcon /> },
];
function ManageSidebar() {
  const [isManageOpen, setIsManageOpen] = useState(true);
  const handleManageTab = () => {
    setIsManageOpen(!isManageOpen);
  };
  return (
    <aside className="mt-11 flex flex-col gap-5 rounded-lg bg-white p-4 shadow-lg md:p-6">
      <button
        className="flex items-center justify-between border-b-2 pb-2 text-xs font-semibold text-gray-700 md:text-xl"
        onClick={handleManageTab}
      >
        Manage my network{" "}
        <KeyboardArrowDownIcon className="rounded-full p-1 text-sm hover:bg-gray-200 md:text-lg" />
      </button>
      {isManageOpen && (
        <div className="flex flex-col justify-between gap-4">
          {buttons.map((button, idx) => (
            <button
              className="flex items-center gap-2 text-xs text-gray-600 hover:rounded-lg hover:bg-gray-100 md:gap-5 md:p-2 md:text-xl"
              key={idx}
            >
              {button.icon}
              {button.text}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default ManageSidebar;
