/** @format */
import useThemeClasses from "../../hooks/useThemeClasses";

function OtherButton({ handleOtherChange, isOther }) {
  const { darkMode } = useThemeClasses();
  return (
    <button
      onClick={handleOtherChange}
      className={`w-full border-b-2 p-1 py-2 ${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
      } ${isOther ? "border-b-green-500 text-green-500" : null}`}
    >
      Other
    </button>
  );
}

export default OtherButton;
