/** @format */

import useThemeClasses from "../../../../hooks/useThemeClasses";

function WebsiteInfo() {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  return (
    <div className="flex flex-col gap-3">
      <div>
        {" "}
        <h1 className={`${textColorClass} text-xl font-semibold`}>Website</h1>
        <span className="font-semibold text-gray-500">
          Add a link that will appear at the top of your profile{" "}
        </span>
      </div>
      <div className={`${textColorClass} flex flex-col`}>
        <span>Link</span>
        <input
          type="text"
          className={`${componentBGColorClass} w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin`}
        />
      </div>
    </div>
  );
}
export default WebsiteInfo;
