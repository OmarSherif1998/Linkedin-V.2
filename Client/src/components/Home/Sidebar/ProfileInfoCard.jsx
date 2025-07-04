import useThemeClasses from '../../../hooks/useThemeClasses';
import useNavigation from '../../../hooks/useNavigation';
import useUser from '../../../hooks/useUser';
import AddIcon from '@mui/icons-material/Add';

function ProfileInfoCard({ setIsFormOpen }) {
  const { NavigateToProfile } = useNavigation();
  const { textColorClass, componentBGColorClass, borderClass, darkMode } =
    useThemeClasses();
  const {
    coverPicture,
    profilePicture,
    firstName,
    lastName,
    bio,
    country,
    city,
    experiences,
  } = useUser();

  const experience =
    Array.isArray(experiences) && experiences.length > 0
      ? experiences[0]
      : null;

  return (
    <div
      className={`relative flex flex-col items-start gap-1 rounded-xl pb-3 ${borderClass} ${componentBGColorClass}`}
    >
      <div
        onClick={NavigateToProfile}
        className='relative h-[5rem] w-full cursor-pointer'
      >
        <img
          src={coverPicture}
          alt=''
          className='h-[80%] w-full rounded-t-lg object-cover'
        />
        <img
          src={profilePicture}
          alt='profilePicture'
          className='absolute -bottom-[20%] left-[8%] z-10 size-16 transform rounded-full border bg-white object-cover'
        />
      </div>

      <button onClick={NavigateToProfile} className={`mt-5 flex flex-col pl-5`}>
        <h2
          className={`${textColorClass} text-lg font-semibold hover:underline`}
        >
          {firstName} {lastName}
        </h2>
      </button>

      <span
        className={`pl-5 pr-3 text-start text-[9px] ${
          darkMode ? textColorClass : 'text-gray-600'
        }`}
      >
        {bio}
      </span>
      {city && (
        <span
          className={`px-5 text-start text-[10px] ${
            darkMode ? textColorClass : 'text-gray-600'
          }`}
        >
          {city}, {country}
        </span>
      )}

      <div
        className={`px-5 text-start text-[10px] ${
          darkMode ? textColorClass : 'text-gray-600'
        }`}
      >
        {experience ? (
          <span className='flex items-center gap-1 font-bold'>
            <img
              src={experience?.company?.profilePicture}
              alt=''
              className='size-5'
            />
            {experience?.company?.name}
          </span>
        ) : (
          <button
            onClick={() => setIsFormOpen(true)}
            type='button'
            className={`flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-1 text-gray-500 hover:bg-opacity-70`}
          >
            <AddIcon fontSize='small' />
            Experience
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileInfoCard;
