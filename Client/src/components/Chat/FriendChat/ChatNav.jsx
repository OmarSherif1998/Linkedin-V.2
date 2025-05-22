import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import useThemeClasses from "../../../hooks/useThemeClasses";
import StatusDot from "../../util/StatusDot";
import timeAgo from "../../../functions/timeAgo";
function ChatNav({
  profilePicture,
  firstName,
  lastName,
  FriendChatID,
  closeChatTab,
  name,
  activeStatus,
}) {
  const { componentBGColorClass, textColorClass, darkMode } = useThemeClasses();

  return (
    <nav
      className={`${componentBGColorClass} flex items-center justify-between border-b border-gray-500 p-2`}
    >
      <div className="flex items-center">
        <img
          src={profilePicture}
          alt=""
          className="mr-2 h-8 w-8 rounded-full object-cover"
        />
        <h2 className={`${textColorClass} flex flex-col text-sm font-medium`}>
          <div className="flex items-center gap-1">
            {firstName && lastName ? `${firstName} ${lastName}  ` : name}{" "}
            <StatusDot activeStatus={activeStatus.activeNow} />
          </div>
          <span className="text-xs font-normal text-gray-500">
            {activeStatus.activeNow
              ? "Active Now"
              : timeAgo(activeStatus.lastSeen)}
          </span>
        </h2>
      </div>
      <section className="flex gap-1">
        <MoreHorizIcon
          fontSize="small"
          className={`${darkMode ? textColorClass : "text-gray-500"} cursor-pointer hover:text-gray-700`}
        />
        <VideocamIcon
          fontSize="small"
          className={`${darkMode ? textColorClass : "text-gray-500"} cursor-pointer hover:text-gray-700`}
        />
        <CloseIcon
          fontSize="small"
          className={`${darkMode ? textColorClass : "text-gray-500"} cursor-pointer hover:text-gray-700`}
          onClick={() => closeChatTab(FriendChatID)}
        />
      </section>
    </nav>
  );
}

export default ChatNav;
