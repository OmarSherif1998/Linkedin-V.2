/** @format */

import useThemeClasses from '../../hooks/useThemeClasses';

function PendingButton({ cancelConnectionRequest }) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <aside className='ml-auto'>
      <button
        onClick={cancelConnectionRequest}
        className={`${textColorClass} ${hoverColorClass} cursor-pointer rounded-full border border-gray-400 bg-transparent px-4 py-1 font-medium`}
      >
        <span className='text-sm'>Pending</span>
      </button>
    </aside>
  );
}

export default PendingButton;
