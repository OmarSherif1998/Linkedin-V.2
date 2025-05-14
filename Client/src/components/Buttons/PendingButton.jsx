/** @format */

import useThemeClasses from "../../hooks/useThemeClasses";

function PendingButton() {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <aside className="ml-auto">
      <button
        className={`${textColorClass} ${hoverColorClass} cursor-pointer rounded-full border border-gray-400 bg-transparent px-4 py-1.5 font-medium`}
      >
        <span className="">Pending</span>
      </button>
    </aside>
  );
}

export default PendingButton;
