/** @format */

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useThemeClasses from "../../../hooks/useThemeClasses";
function MessagingNav({
  isMessagingTabOpen,
  user,
  openNewChatTab,
  handleMessagingTabOpen,
}) {
  const {
    componentBGColorClass,
    borderClass,
    textColorClass,
    hoverColorClass,
  } = useThemeClasses();
  return (
    <nav
      className={`z-50 mb-1 flex cursor-pointer items-center justify-between rounded-t-md border-b ${borderClass} ${textColorClass} p-2 ${
        isMessagingTabOpen ? "bg-blue-400" : `${componentBGColorClass}`
      }`}
      onClick={handleMessagingTabOpen}
    >
      <section className="flex items-center gap-2">
        <img
          src={user?.profilePicture}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <p className="font-semibold">Messaging</p>
      </section>
      <section className="flex items-center gap-2">
        <MoreHorizIcon
          className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
          fontSize="large"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <EditNoteIcon
          fontSize="large"
          className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
          onClick={(e) => {
            e.stopPropagation();
            openNewChatTab();
          }}
        />
        {!isMessagingTabOpen ? (
          <KeyboardArrowUpIcon
            className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
            fontSize="large"
            onClick={(e) => {
              e.stopPropagation();
              handleMessagingTabOpen();
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            className={`${hoverColorClass} cursor-pointer rounded-full p-1`}
            fontSize="large"
            onClick={(e) => {
              e.stopPropagation();
              handleMessagingTabOpen();
            }}
          />
        )}
      </section>
    </nav>
  );
}

export default MessagingNav;
