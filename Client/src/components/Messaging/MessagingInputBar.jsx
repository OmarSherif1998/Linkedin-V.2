import useThemeClasses from "../../hooks/useThemeClasses";

function MessagingInputBar({ handleKeyDown }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <footer
      className={`${componentBGColorClass} sticky bottom-0 border-t border-gray-200 p-3`}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className={`${componentBGColorClass} flex-1 ${textColorClass} rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onKeyDown={handleKeyDown}
        />
      </div>
    </footer>
  );
}

export default MessagingInputBar;
