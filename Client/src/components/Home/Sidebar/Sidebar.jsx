/** @format */
import useThemeClasses from '../../../hooks/useThemeClasses';

import ProfileImpressions from './ProfileImpressions';
import ProfileInfoCard from './ProfileInfoCard';
import PremiumCard from './PremiumCard';
import OptionsCard from './OptionsCard';

function Sidebar({ setIsFormOpen }) {
  const { componentBGColorClass, borderClass } = useThemeClasses();

  return (
    <div className='flex flex-col gap-1 rounded-lg'>
      <ProfileInfoCard setIsFormOpen={setIsFormOpen} />

      <div className='flex flex-col gap-1'>
        <ProfileImpressions />

        <div
          className={`${componentBGColorClass} rounded-xl ${borderClass} text-xs`}
        >
          <PremiumCard />
        </div>

        <OptionsCard />
      </div>
    </div>
  );
}

export default Sidebar;
