/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";

function LabelComponent({ label, required }) {
  const { textColorClass, darkMode } = useThemeClasses();
  return (
    <label className={`${darkMode ? `${textColorClass}` : "text-gray-400"}`}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}
export default LabelComponent;
