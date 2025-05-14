/** @format */
import useThemeClasses from "../../../hooks/useThemeClasses";
import { recentData } from "../../../staticData/SidebarData";
import RecentItems from "./RecentItems";
import ProfileImpressions from "./ProfileImpressions";
import ProfileInfoCard from "./ProfileInfoCard";
import PremiumCard from "./PremiumCard";
import OptionsCard from "./OptionsCard";
function Sidebar() {
  const { textColorClass, componentBGColorClass, borderClass } =
    useThemeClasses();

  return (
    <div className="flex flex-col gap-1 rounded-lg">
      <ProfileInfoCard />

      <div className="flex flex-col gap-1">
        <ProfileImpressions />

        <div
          className={`${componentBGColorClass} border-lightgray rounded-xl ${borderClass} text-xs`}
        >
          <PremiumCard />
        </div>

        <OptionsCard />
      </div>

      <div
        className={`${componentBGColorClass} ${borderClass} border-lightgray mt-2.5 rounded-lg p-2.5 text-left`}
      >
        <p className={`pb-2.5 ${textColorClass} text-sm`}>Recent</p>

        {recentData.map(RecentItems)}
      </div>
    </div>
  );
}

export default Sidebar;
