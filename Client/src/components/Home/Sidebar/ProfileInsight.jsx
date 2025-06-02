import useThemeClasses from "../../../hooks/useThemeClasses";

const ProfileInsight = ({ profileData }) => {
  const { darkMode, textColorClass, borderClass, componentBGColorClass } =
    useThemeClasses();
  return (
    <div
      className={`flex w-full cursor-pointer items-center p-2 ${
        darkMode ? "hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"
      } `}
    >
      <p className={`${darkMode ? textColorClass : "text-gray-600"}`}>
        {profileData.Title}
      </p>
      <p className="ml-auto font-semibold text-[#0a66c2]">{profileData.Num}</p>
    </div>
  );
};

export default ProfileInsight;
