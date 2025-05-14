import { profileData } from "../../../staticData/SidebarData";
import ProfileInsight from "./ProfileInsight";

function ProfileImpressions() {
  return (
    <div className={`flex flex-col gap-1 rounded-xl`}>
      {profileData.map((data, index) => (
        <ProfileInsight key={index} profileData={data} />
      ))}
    </div>
  );
}

export default ProfileImpressions;
