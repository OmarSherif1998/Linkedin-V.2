/** @format */

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useThemeClasses from "../../hooks/useThemeClasses";

function Skills({ Skills = [] }) {
  const {
    componentBGColorClass,
    textColorClass,
    hoverColorClass,
    iconColorClass,
  } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} border-gray-400 p-2 md:rounded-lg md:border md:shadow-xl`}
    >
      <div
        className={`flex items-center justify-between font-semibold ${textColorClass} md:text-lg`}
      >
        <h1>Skills</h1>
        <div className="flex gap-1">
          <AddIcon
            className={`${hoverColorClass} rounded-full p-2`}
            sx={{ fontSize: { xs: 30, md: 40 } }}
          />
          <EditIcon
            sx={{ fontSize: { xs: 30, md: 40 } }}
            className={`${hoverColorClass} rounded-full p-2`}
          />
        </div>
      </div>

      {Skills.map((skill, index) => (
        <p
          key={index}
          className={`border-b border-gray-300 py-2 ${textColorClass} md:text-lg`}
        >
          {skill}
        </p>
      ))}
      <div
        className={`${hoverColorClass} mt-2 flex cursor-pointer justify-center rounded-b-lg`}
      >
        {Skills.length > 0 && (
          <button
            className={`flex items-center justify-center gap-2 py-2 ${textColorClass} `}
          >
            Show all {Skills.length} skills{" "}
            <ArrowForwardIcon style={{ color: iconColorClass }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Skills;
