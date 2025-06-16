import useThemeClasses from "../../../hooks/useThemeClasses";
import { profileData } from "../../../staticData/SidebarData";

function Impressions() {
  const { componentBGColorClass, darkMode, textColorClass } = useThemeClasses();
  return (
    <div
      className={`mb-5 flex flex-col border-b border-gray-600 pb-1 ${componentBGColorClass}`}
    >
      {profileData.map((data, index) => (
        <div
          key={index}
          className={`flex w-full cursor-pointer items-center px-4 py-1`}
        >
          <p className={`${darkMode ? textColorClass : "text-gray-600"}`}>
            <span className="ml-auto font-semibold text-[#0a66c2]">
              {" "}
              {data.Num}
            </span>{" "}
            {data.Title.toLowerCase()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Impressions;
