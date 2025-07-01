import useNavigation from '../../hooks/useNavigation';
import useThemeClasses from '../../hooks/useThemeClasses';
import AddIcon from '@mui/icons-material/Add';

function NewCompany({ Name, bio, profilePicture, comapnyID, followers }) {
  const { componentBGColorClass, textColorClass, darkMode } = useThemeClasses();
  const { NavigateToCompany } = useNavigation();
  return (
    <div
      className={`${componentBGColorClass} mb-3 flex flex-col gap-3`}
      onClick={() => NavigateToCompany(comapnyID)}
    >
      <div
        className={`${componentBGColorClass} flex cursor-pointer items-start gap-2 p-2 ${textColorClass}`}
      >
        {' '}
        <img
          src={profilePicture}
          alt='profilePicture'
          className='mt-[3%] size-10'
        />
        <div className='flex flex-col gap-2'>
          <div>
            {' '}
            <h4 className='flex flex-col text-sm'>{Name}</h4>
            <p
              className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-400'} `}
            >
              {bio}
            </p>
            <p className={`text-xs font-semibold text-gray-500`}>
              {followers}M Followers
            </p>
          </div>

          <button
            className={`flex w-[7rem] items-center justify-center gap-1 rounded-2xl border-[0.125rem] border-gray-500 p-1 font-normal ${darkMode ? `${textColorClass} hover:border-white` : 'text-gray-500 hover:border-black hover:text-black'} hover:shadow-lg" transition-all duration-100 hover:font-medium`}
          >
            <AddIcon
              className={` ${darkMode ? textColorClass : 'text-black'} `}
              fontSize='small'
            />
            <p>Follow</p>
          </button>
        </div>
      </div>
      <div className='flex mx-4 border border-gray-200'></div>
    </div>
  );
}

export default NewCompany;
