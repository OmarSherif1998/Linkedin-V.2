/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";

function ButtonComponent({ buttonClass, buttonHandler, buttonText }) {
  const { hoverColorClass, darkMode } = useThemeClasses();
  return (
    <button
      className={`${buttonClass} my-5 w-fit rounded-lg p-2 text-LinkedInBlue ${darkMode ? `${hoverColorClass} hover:text-white` : "hover:bg-blue-50 hover:text-blue-900"}`}
      onClick={buttonHandler}
    >
      {buttonText}
    </button>
  );
}

export default ButtonComponent;
