import useThemeClasses from "../../../hooks/useThemeClasses";
import { profileData } from "../../../staticData/SidebarData";
import ProfileInsight from "./ProfileInsight";

function ProfileImpressions() {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div className={`flex flex-col rounded-xl ${componentBGColorClass}`}>
      {profileData.map((data, index) => (
        <ProfileInsight key={index} profileData={data} />
      ))}
    </div>
  );
}

export default ProfileImpressions;
