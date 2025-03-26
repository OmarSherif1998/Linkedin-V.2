/** @format */

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Skills({ Skills = [] }) {
  return (
    <div className="p-2 bg-white border-gray-400 md:rounded-lg md:border md:shadow-xl">
      <div className="flex items-center justify-between font-semibold text-black md:text-lg">
        <h1>Skills</h1>
        <div className="flex gap-1">
          <AddIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
          <EditIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
        </div>
      </div>

      {Skills.map((skill, index) => (
        <p
          key={index}
          className="py-2 text-gray-800 border-b border-gray-300 md:text-lg"
        >
          {skill}
        </p>
      ))}
      <div className="flex justify-center">
        {Skills.length > 0 && (
          <button className="flex items-center justify-center gap-2 py-2 text-gray-800">
            Show all {Skills.length} skills <ArrowForwardIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default Skills;
