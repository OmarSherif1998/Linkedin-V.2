/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";

function Column({ colData }) {
  const { textColorClass } = useThemeClasses();
  return (
    <ul
      className={`mb-2 text-xs font-semibold ${textColorClass} text-opacity-60`}
    >
      {colData.map((data, idx) => {
        return (
          <li className="pb-2" key={idx}>
            {data.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Column;
