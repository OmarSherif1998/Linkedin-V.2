import useNavigation from '../../hooks/useNavigation';
import useScreenSize from '../../hooks/useScreenSize';
import useThemeClasses from '../../hooks/useThemeClasses';
import InteractionsButtons from './util/InteractionsButtons';

function UniversityResults({ university }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { NavigateToUniversity } = useNavigation();
  const { isMobile } = useScreenSize();
  return (
    <div
      className={`${componentBGColorClass} w-full cursor-pointer ${isMobile ? 'rounded-none px-1 pb-2' : 'rounded-lg pb-5 pl-0 pr-5 pt-0'} `}
    >
      <div
        key={university._id}
        className={`flex w-full items-center gap-4 rounded-lg ${isMobile ? 'p-2' : 'p-4'} ${componentBGColorClass}`}
        onClick={() => NavigateToUniversity(university._id)}
      >
        {/* Logo */}
        <img
          src={university.profilePicture}
          alt='University Logo'
          className='size-20 rounded object-cover md:size-48'
        />

        {/* Main Content */}
        <div className='flex w-full flex-col justify-between'>
          {/* University Info */}
          <div>
            <p className={`text-lg font-semibold ${textColorClass}`}>
              {university.name}
            </p>
            <p className='text-sm text-gray-400'>{university.industry}</p>
            <p className='text-sm text-gray-500'>
              {university.city}, {university.country}
            </p>

            {/* Follower Count */}
            <div className='mt-1 flex items-center gap-1 text-sm text-gray-400'>
              <i className='ri-group-line' />
              <span className='font-semibold'>
                {university.followers}M
              </span>{' '}
              followers
            </div>

            {/* Mutual connections (if available) */}
            <div className='mt-2 flex items-center gap-2 text-sm text-gray-400'>
              {/* Replace with actual images if available */}
              <div className='flex -space-x-2'>
                <img
                  className='h-6 w-6 rounded-full border border-white'
                  src='https://randomuser.me/api/portraits/men/32.jpg'
                  alt='connection'
                />
                <img
                  className='h-6 w-6 rounded-full border border-white'
                  src='https://randomuser.me/api/portraits/women/44.jpg'
                  alt='connection'
                />
              </div>
              <span>
                <strong className='text-white'>55</strong> connections work here
              </span>
            </div>
          </div>
          {isMobile ? null : (
            <InteractionsButtons
              navigator={() => NavigateToUniversity(university._id)}
            />
          )}
        </div>
      </div>
      {isMobile ? (
        <InteractionsButtons
          navigator={() => NavigateToUniversity(university._id)}
        />
      ) : null}
    </div>
  );
}

export default UniversityResults;
