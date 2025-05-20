/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";
const SquareCheckbox = ({
  name,
  value,
  onChange,
  label,
  checked,
  setChecked,
}) => {
  const { textColorClass, darkMode } = useThemeClasses();
  return (
    <div className={`flex items-center ${textColorClass}`}>
      <input
        type="checkbox"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
        className={`checked:before:text-md flex h-5 w-5 appearance-none items-center justify-center rounded-md border-2 border-${
          darkMode ? "white" : "black"
        } checked:border-green-600 checked:bg-green-600 checked:before:absolute checked:before:font-semibold checked:before:text-white checked:before:content-['✓']`}
      />
      <label htmlFor={value} className={`ml-2 font-thin ${textColorClass}`}>
        {label}
      </label>
    </div>
  );
};

export default SquareCheckbox;
