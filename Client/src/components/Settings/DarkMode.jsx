import React, { useState } from "react";
import useThemeClasses from "../../hooks/useThemeClasses";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDarkMode } from "../../Redux/sllices/themeSlice";
function DarkMode() {
  const { darkMode, componentBGColorClass } = useThemeClasses();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const { formWidth } = useOutletContext();
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <div
      className={`flex flex-col gap-5 ${formWidth} h-fit rounded-t-lg ${componentBGColorClass} p-5`}
    >
      <label className="flex items-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Dark Mode
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleToggle}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full transition-colors duration-300 ${
              isDarkMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
              isDarkMode ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
