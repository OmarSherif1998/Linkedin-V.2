/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";

function TextAreaComponent({ value, placeholder, height, onChange }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`w-[95%] ${componentBGColorClass} ${textColorClass} rounded-md border-[1.5px] border-gray-400 px-4 font-thin h-${height} `}
      placeholder={placeholder}
    />
  );
}
export default TextAreaComponent;
