import useThemeClasses from "../../../hooks/useThemeClasses";
function TypingIndicator({ isFriendTyping, friendChatInfo }) {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div>
      {isFriendTyping && (
        <div className="flex items-center gap-1 ml-auto">
          <img
            src={friendChatInfo.profilePicture}
            alt=""
            className="object-cover rounded-full size-5"
          />{" "}
          <div className="flex h-fit w-fit items-center space-x-[4px] rounded-xl bg-gray-300 p-3">
            <span
              className={`size-1 animate-bounce rounded-full ${componentBGColorClass} [animation-delay:0ms]`}
            ></span>
            <span
              className={`size-1 animate-bounce rounded-full ${componentBGColorClass} [animation-delay:200ms]`}
            ></span>
            <span
              className={`size-1 animate-bounce rounded-full ${componentBGColorClass} [animation-delay:400ms]`}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TypingIndicator;
