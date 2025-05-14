import useThemeClasses from "../../hooks/useThemeClasses";
function NoChats() {
  const { borderClass, componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`mx-auto flex flex-col justify-center overflow-hidden ${borderClass} ${componentBGColorClass} px-2 py-2 md:h-[80vh] md:w-[60%] md:rounded-md md:px-5`}
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No chats available</p>
      </div>{" "}
    </div>
  );
}

export default NoChats;
