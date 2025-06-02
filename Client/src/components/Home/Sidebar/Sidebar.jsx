/** @format */
import useThemeClasses from "../../../hooks/useThemeClasses";

import ProfileImpressions from "./ProfileImpressions";
import ProfileInfoCard from "./ProfileInfoCard";
import PremiumCard from "./PremiumCard";
import OptionsCard from "./OptionsCard";
function Sidebar() {
  const { componentBGColorClass, borderClass } = useThemeClasses();

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
    </div>
  );
}

export default Sidebar;
