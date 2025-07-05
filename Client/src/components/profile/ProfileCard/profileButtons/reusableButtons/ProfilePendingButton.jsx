/** @format */

import useThemeClasses from '../../../../../hooks/useThemeClasses';
import baseButtonClasses from '../../../../../staticData/baseButtonClasses';

function ProfilePendingButton({ handlePending }) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <button
      onClick={handlePending}
      className={`${textColorClass} ${hoverColorClass} border-gray-400 bg-transparent px-10 py-1 font-medium ${baseButtonClasses} `}
    >
      <span className='text-sm'>Pending</span>
    </button>
  );
}

export default ProfilePendingButton;
