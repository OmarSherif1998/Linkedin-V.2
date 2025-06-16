import useThemeClasses from "../../../hooks/useThemeClasses";
import { profileData } from "../../../staticData/SidebarData";
import ProfileInsight from "./ProfileInsight";

function ProfileImpressions() {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} rounded-xl border border-gray-300 p-2 font-semibold`}
    >
      {profileData.map((data, index) => (
        <ProfileInsight key={index} profileData={data} />
      ))}
    </div>
  );
}

export default ProfileImpressions;
