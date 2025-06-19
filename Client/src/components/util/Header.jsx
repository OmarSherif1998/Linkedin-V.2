/** @format */

import SearchIcon from '@mui/icons-material/Search';
import Headeroptions from '../Options/Headeroptions';
import linkedinSquare from '../../images/icons8-linkedin-96.png';
import { useLocation } from 'react-router-dom';
import { headerInputs, PreumiumInput } from '../../staticData/HeaderData';
import useNavigation from '../../hooks/useNavigation';
import useUser from '../../hooks/useUser';
import VerifyAccountBanner from './VerifyAccountBanner';

import useThemeClasses from '../../hooks/useThemeClasses';
function Header() {
  const { componentBGColorClass, borderClass } = useThemeClasses();
  const { NavigateToHome } = useNavigation();
  const location = useLocation();
  const pathName = location.pathname;
  const { verified } = useUser();

  return (
    <>
      <div className={`${pathName.startsWith('/Settings') ? 'mb-0' : 'mb-6'} `}>
        {!verified && <VerifyAccountBanner />}
        <div
          className={`fixed left-0 right-0 top-0 z-[999] flex h-[4rem] w-full items-center ${borderClass} border-b ${componentBGColorClass} px-4 shadow-sm sm:px-6 md:px-8`}
        >
          <div className='mr-auto flex items-center'>
            <button onClick={() => NavigateToHome}>
              <img
                src={linkedinSquare}
                alt='linkedin logo'
                className='w-[2.5rem] object-cover sm:w-[3rem]'
              />
            </button>
            <div className='hidden w-full items-center rounded-full border px-2 py-2 text-gray-600 sm:w-[20rem] md:flex'>
              <SearchIcon className='text-gray-500' />
              <input
                name='search'
                type='text'
                placeholder='Search'
                className='ml-2 w-full border-none bg-transparent text-sm outline-none'
              />
            </div>
          </div>
          <div className='hidden justify-between gap-2 sm:flex'>
            {headerInputs.map((data, index) => (
              <Headeroptions
                key={index}
                Icon={data?.Icon}
                title={data.title}
                avatar={data.avatar}
                pathName={pathName}
              />
            ))}
            <div className='flex gap-3 border-l border-gray-300 pl-2'>
              {PreumiumInput.map((data, index) => (
                <Headeroptions
                  key={index}
                  Icon={data?.Icon}
                  title={data.title}
                  isDropdown={data.isDropdown}
                  isSpecial={data.isSpecial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='h-[4rem]' />{' '}
      {/* Spacer div to prevent content from being hidden */}
    </>
  );
}

export default Header;
