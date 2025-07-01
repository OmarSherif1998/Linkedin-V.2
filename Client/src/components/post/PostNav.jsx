import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import useThemeClasses from '../../hooks/useThemeClasses.js';

function PostNav() {
  const { textColorClass, darkMode } = useThemeClasses();
  return (
    <header
      className={`mb-[1rem] flex w-full justify-end ${darkMode ? 'border-gray-700' : 'border-gray-200'} `}
    >
      <button className={`${textColorClass} hover:text-black`}>
        <MoreHorizIcon className='cursor-pointer' />
      </button>
      <button className={`${textColorClass}`}>
        <CloseIcon className='cursor-pointer' />
      </button>
    </header>
  );
}

export default PostNav;
