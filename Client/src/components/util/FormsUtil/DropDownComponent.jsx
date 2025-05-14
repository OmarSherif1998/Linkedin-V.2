/** @format */
import { useState } from "react";
import useThemeClasses from "../../../hooks/useThemeClasses";

const DropdownComponent = ({ options, onChange, disabled }) => {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    setSelectedOption(e.target.value); // Update state on change
    onChange(e); // Call the parent handler
  };

  return (
    <select
      disabled={disabled}
      value={selectedOption || ""} // Use the provided value or default to an empty string
      onChange={handleChange}
      className={`${componentBGColorClass} ${textColorClass} w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin text-gray-700`}
    >
      <option value="" disabled={true}>
        Select an option
      </option>
      {options.map((option, index) => (
        <option className={`${textColorClass}`} key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownComponent;
