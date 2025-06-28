import { headerInputs, PreumiumInput } from '../../staticData/HeaderData';
import SearchIcon from '@mui/icons-material/Search';
import Headeroptions from '../Options/Headeroptions';
import linkedinSquare from '../../images/icons8-linkedin-96.png';
import useNavigation from '../../hooks/useNavigation';
import useUser from '../../hooks/useUser';
import VerifyAccountBanner from './VerifyAccountBanner';
import useThemeClasses from '../../hooks/useThemeClasses';
import useSearch from '../../hooks/useSearch';

function Header() {
  const { verified } = useUser();
  const {
    componentBGColorClass,
    borderClass,
    textColorClass,
    hoverColorClass,
  } = useThemeClasses();
  const { NavigateToHome } = useNavigation();
  const {
    searchParams,
    showDropdown,
    searchResults,
    handleInputChange,
    handleSearch,
    handleDropdownBlur,
    pathName,
  } = useSearch();

  const noBottomPadding =
    pathName.startsWith('/Settings') || pathName.startsWith('/search')
      ? true
      : false;

  return (
    <>
      <div className={`${noBottomPadding ? 'mb-0' : 'mb-6'} `}>
        {!verified && <VerifyAccountBanner />}
        <div
          className={`fixed left-0 right-0 top-0 z-[50] flex h-[4rem] w-full items-center ${borderClass} border-b ${componentBGColorClass} px-4 shadow-sm sm:px-6 md:px-8`}
        >
          <div className='flex items-center mr-auto'>
            <img
              onClick={() => NavigateToHome}
              src={linkedinSquare}
              alt='linkedin logo'
              className='z-[999] w-[2.5rem] cursor-pointer object-cover sm:w-[3rem]'
            />
            <div className='relative hidden w-full items-center rounded-full border px-2 py-2 sm:w-[20rem] md:flex'>
              <SearchIcon className='text-gray-500' />
              <input
                onChange={handleInputChange}
                onKeyDown={handleSearch}
                onBlur={handleDropdownBlur}
                name='search'
                type='text'
                placeholder='Search'
                className={`ml-2 w-full border-none bg-transparent ${textColorClass} text-sm outline-none`}
                value={searchParams}
                autoComplete='off'
              />
              {showDropdown && searchResults.length > 0 && (
                <div
                  className={`absolute left-0 top-12 w-full ${componentBGColorClass} z-50 rounded border border-gray-200 shadow-lg ${hoverColorClass}`}
                >
                  {searchResults.map((result, idx) => (
                    <div key={idx} className={`cursor-pointer px-4 py-2`}>
                      <p className={`${textColorClass} `}> {result}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='justify-between hidden gap-2 sm:flex'>
            {headerInputs.map((data, index) => (
              <Headeroptions
                key={index}
                Icon={data?.Icon}
                title={data.title}
                avatar={data.avatar}
                pathName={pathName}
              />
            ))}
            <div className='flex gap-3 pl-2 border-l border-gray-300'>
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
