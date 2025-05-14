/** @format */

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useThemeClasses from "../../../hooks/useThemeClasses";

function OpenTo() {
  const { darkMode } = useThemeClasses();
  return (
    <div
      className={`${darkMode ? "bg-blue-200" : "bg-OpenToWork"} ml-[1rem] flex min-h-[5rem] w-[90%] flex-col rounded-md p-3`}
    >
      <div className="flex md:mt-[0.5rem]">
        <h1 className="text-sm font-semibold">Open to work</h1>
        <button className="ml-auto">
          <EditOutlinedIcon fontSize="sm" />
        </button>
      </div>
      <p>This is a placeholder for your open to work section.</p>
    </div>
  );
}

export default OpenTo;
