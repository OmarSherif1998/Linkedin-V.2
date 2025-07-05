import { Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import useNavigation from '../../hooks/useNavigation';
import useThemeClasses from '../../hooks/useThemeClasses';
import useSearch from '../../hooks/useSearch';

const MobileHeader = ({ profilePicture, onProfileClick }) => {
  const { NavigateToMessaging } = useNavigation();
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { searchParams, handleInputChange, handleSearch } = useSearch();

  return (
    <div
      className={` ${componentBGColorClass} sticky top-0 z-[999] flex h-[4rem] w-full items-center justify-between border-b border-gray-600 px-4 lg:mb-4`}
    >
      <Avatar
        onClick={onProfileClick}
        src={profilePicture}
        className='border border-gray-500'
        style={{ height: '2rem', width: '2rem' }}
      />
      <div
        className={`py-2 ${textColorClass} flex w-[75%] items-center rounded-full border border-gray-600 px-2`}
      >
        <SearchIcon className='text-gray-500' />
        <input
          name='search'
          type='text'
          placeholder='Search'
          className='ml-2 w-full border-none bg-transparent text-sm outline-none placeholder:bg-transparent'
          value={searchParams}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
        />
      </div>
      <ChatIcon onClick={NavigateToMessaging} className='text-gray-600' />
    </div>
  );
};

export default MobileHeader;
