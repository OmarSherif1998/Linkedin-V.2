/** @format */
import { formatTimeToHHMM } from "../../functions/formatTimeToHHMM";
import useThemeClasses from "../../hooks/useThemeClasses";
import useUser from "../../hooks/useUser";

function ChatList({ friendsList, openNewChatTab }) {
  const { darkMode, textColorClass } = useThemeClasses();
  const { _id } = useUser();
  return (
    <div>
      {friendsList?.map((friend, idx) => (
        <div key={friend._id}>
          <div
            className={`flex w-full cursor-pointer items-start justify-between gap-3 p-3 ${
              darkMode
                ? `${textColorClass} hover:bg-gray-800`
                : "hover:bg-gray-100"
            }`}
            key={friend._id}
            onClick={() => {
              openNewChatTab(friend._id, "ChatList");
            }}
          >
            <section className="flex items-center gap-3">
              <img
                src={friend.profilePicture}
                alt=""
                className="size-8 rounded-full object-cover"
              />
              <div
                className={`${textColorClass} flex flex-col justify-items-start`}
              >
                {friend.name}

                <p className="ml-2 text-sm text-gray-500">
                  {friend.sender === _id
                    ? "You: " + friend.lastMessage
                    : friend.name + ": " + friend.lastMessage}
                </p>
              </div>
            </section>
            {formatTimeToHHMM(friend.updatedAt)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
