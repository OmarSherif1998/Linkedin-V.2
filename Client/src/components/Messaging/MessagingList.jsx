import { formatTimeToHHMM } from "../../functions/formatTimeToHHMM";
import LoadingSpinner from "../util/LoadingSpinner";
import useThemeClasses from "../../hooks/useThemeClasses";
import { useUser } from "../../hooks/useUser";
function MessagingList({ chats, isLoading, handleActiveChatInfo, activeChat }) {
  const { darkMode, textColorClass, hoverColorClass } = useThemeClasses();
  const { _id } = useUser();
  console.log(hoverColorClass);
  return (
    <div className="w-full h-full overflow-y-auto border border-r-0">
      {isLoading ? (
        <LoadingSpinner spinnerSize={10} />
      ) : (
        chats?.map((chat) => {
          return (
            <div
              onClick={() => {
                handleActiveChatInfo(chat.roomID, chat._id);
              }}
              key={chat._id}
              className={`${hoverColorClass} flex cursor-pointer items-start gap-3 px-4 py-3 transition-all ${
                activeChat === chat.roomID
                  ? `border-l-2 border-green-500 ${darkMode ? "bg-gray-8 00" : "bg-gray-300"}`
                  : null
              }`}
            >
              <img
                src={chat.profilePicture}
                alt={chat.name}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div className="flex flex-col flex-1 pb-2 border-b">
                <div className="flex items-center justify-between">
                  <h3 className={`${textColorClass} text-[15px] font-semibold`}>
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatTimeToHHMM(chat.updatedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {_id === chat.senderID ? "You: " : chat.name + ": "}
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MessagingList;
