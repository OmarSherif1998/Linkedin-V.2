import useThemeClasses from "../../../hooks/useThemeClasses";

function SidebarOptions() {
  const { textColorClass } = useThemeClasses();
  return (
    <div
      className={`${textColorClass} flex flex-1 flex-col gap-5 border-b border-gray-600 px-4 font-bold`}
    >
      <p>Puzzle games</p>
      <p>Saved posts</p>
      <p>Groups</p>
    </div>
  );
}

export default SidebarOptions;
