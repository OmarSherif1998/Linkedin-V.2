import { useEffect } from 'react';
import useFollowCompany from '../../hooks/useFollowCompany';
import useNavigation from '../../hooks/useNavigation';
import useThemeClasses from '../../hooks/useThemeClasses';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
function NewCompany({
  Name,
  bio,
  profilePicture,
  companyID,
  followers,
  isFollowingFlag,
}) {
  const { componentBGColorClass, textColorClass, darkMode } = useThemeClasses();
  const { NavigateToCompany } = useNavigation();

  const { isFollowing, isDisabled, handleFollow } = useFollowCompany(
    isFollowingFlag,
    companyID,
  );

  return (
    <div className={`${componentBGColorClass} mb-3 flex flex-col gap-3`}>
      <div
        className={`${componentBGColorClass} flex cursor-pointer items-start gap-2 p-2 ${textColorClass}`}
      >
        {' '}
        <img
          onClick={() => NavigateToCompany(companyID)}
          src={profilePicture}
          alt='profilePicture'
          className='mt-[3%] size-10'
        />
        <div
          onClick={() => NavigateToCompany(companyID)}
          className='flex flex-col gap-2'
        >
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
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              handleFollow();
            }}
            className={`flex w-[7rem] items-center justify-center gap-1 rounded-2xl border-[0.125rem] border-gray-500 p-1 font-normal ${darkMode ? `${textColorClass} hover:border-white` : 'text-gray-500 hover:border-black hover:text-black'} hover:shadow-lg" transition-all duration-100`}
          >
            {isFollowing ? (
              <CheckIcon
                className={` ${darkMode ? textColorClass : 'text-black'} `}
                fontSize='small'
              />
            ) : (
              <AddIcon
                className={` ${darkMode ? textColorClass : 'text-black'} `}
                fontSize='small'
              />
            )}
            <p>{isFollowing ? 'Following' : 'Follow'}</p>
          </button>
        </div>
      </div>
      <div className='flex mx-4 border border-gray-200'></div>
    </div>
  );
}

export default NewCompany;
