/** @format */
import useThemeClasses from "../../../hooks/useThemeClasses";

function InputComponent({ value, onChange, placeholder }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`${componentBGColorClass} ${textColorClass} w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin`}
      placeholder={placeholder}
    />
  );
}

export default InputComponent;
