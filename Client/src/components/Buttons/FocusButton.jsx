/** @format */
import useThemeClasses from "../../hooks/useThemeClasses";

function FocusButton({ handleFocusChange, isFocused }) {
  const { darkMode, textColorClass } = useThemeClasses();
  return (
    <button
      onClick={handleFocusChange}
      className={`w-full border-b-2 p-1 py-2 hover:bg-gray-100 ${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
      } ${isFocused ? "border-b-green-500 text-green-500" : null}`}
    >
      Focused
    </button>
  );
}

export default FocusButton;
