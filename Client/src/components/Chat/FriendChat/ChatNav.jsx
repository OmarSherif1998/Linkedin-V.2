import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

function ChatNav({
  profilePicture,
  firstName,
  lastName,
  FriendChatID,
  closeChatTab,
  name,
}) {
  return (
    <nav className="flex items-center justify-between border-b bg-gray-100 p-2">
      <div className="flex items-center">
        <img
          src={profilePicture}
          alt=""
          className="mr-2 h-8 w-8 rounded-full object-cover"
        />
        <h2 className="text-sm font-medium">
          {firstName && lastName ? `${firstName} ${lastName}  ` : name}
        </h2>
      </div>
      <section className="flex gap-1">
        <MoreHorizIcon
          fontSize="small"
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        />
        <VideocamIcon
          fontSize="small"
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        />
        <CloseIcon
          fontSize="small"
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => closeChatTab(FriendChatID)}
        />
      </section>
    </nav>
  );
}

export default ChatNav;
