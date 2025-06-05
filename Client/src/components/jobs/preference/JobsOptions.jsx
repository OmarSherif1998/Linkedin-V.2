import useThemeClasses from "../../../hooks/useThemeClasses";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InsightsIcon from "@mui/icons-material/Insights";
import CreateIcon from "@mui/icons-material/Create";
function JobsOptions({ onOpenPreferences }) {
  const {
    textColorClass,
    componentBGColorClass,
    borderClass,
    darkMode,
    hoverColorClass,
  } = useThemeClasses();

  const list = [
    {
      icon: <FormatListBulletedIcon className="text-2xl" />,
      text: "Preference",
      onClick: onOpenPreferences,
    },
    {
      icon: <BookmarkIcon className="text-2xl" />,
      text: "Saved Jobs",
    },
    {
      icon: <InsightsIcon className="text-2xl" />,
      text: "Job Insights",
    },
  ];
  return (
    <div
      className={`relative flex flex-col items-start rounded-xl ${borderClass} ${componentBGColorClass}`}
    >
      <div className="w-full">
        {" "}
        {list.map((item, index) => (
          <div
            onClick={item.onClick}
            key={index}
            className={`flex w-full ${hoverColorClass} cursor-pointer ${index === 0 ? "rounded-t-lg" : ""} items-center gap-3 p-3 ${darkMode ? "dark:text-white" : textColorClass}`}
          >
            {item.icon}
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        className={`flex w-full items-center gap-1 rounded-b-lg p-3 ${hoverColorClass} hover:underline ${darkMode ? "text-blue-400" : textColorClass}`}
      >
        <CreateIcon /> Post a Free Job
      </button>
    </div>
  );
}

export default JobsOptions;
