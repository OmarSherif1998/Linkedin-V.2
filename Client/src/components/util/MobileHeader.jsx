/** @format */

import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useNavigation } from "../../hooks/useNavigation";
import useThemeClasses from "../../hooks/useThemeClasses";

const MobileHeader = ({ profilePicture, _id }) => {
  const { NavigateToProfile, NavigateToChat } = useNavigation();
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`border-light-gray ${componentBGColorClass} sticky top-0 z-[999] flex h-[4rem] w-full items-center justify-between border-b px-4`}
    >
      <Avatar
        onClick={NavigateToProfile}
        src={profilePicture}
        className="border border-gray-500"
        style={{ height: "2rem", width: "2rem" }}
      />
      <div className="flex w-[75%] items-center rounded-md bg-[#eef3f8] px-2 py-2 text-gray-600">
        <SearchIcon className="text-gray-500" />
        <input
          name="search"
          type="text"
          placeholder="Search"
          className="ml-2 w-full border-none bg-transparent text-sm outline-none"
        />
      </div>
      <ChatIcon onClick={NavigateToChat} className="text-gray-600" />
    </div>
  );
};

export default MobileHeader;
