import useThemeClasses from '../../hooks/useThemeClasses';
import ProfileCardButtons from '../util/ProfileCardButtons';
import { RiShareForwardBoxFill } from 'react-icons/ri';
function UniversityCard({ UniversityData }) {
  const { componentBGColorClass, borderClass, textColorClass } =
    useThemeClasses();
  const { coverPicture, profilePicture, bio, city, country, name, industry } =
    UniversityData;
  return (
    <div
      className={`${componentBGColorClass} w-full flex-col gap-5 pb-2 md:flex lg:rounded-t-md CustomScreen:m-auto md:${borderClass} `}
    >
      <section>
        {/* Banner section */}
        <div className='relative h-28 w-full bg-gray-300 md:h-32 lg:rounded-t-md'>
          {coverPicture && (
            <img
              src={coverPicture}
              alt='University Cover'
              className='h-full w-full object-cover lg:rounded-t-md'
            />
          )}
          <div className='absolute -bottom-10 left-6 flex items-end'>
            <img
              src={profilePicture}
              alt='University Profile'
              className='h-24 w-24 border-4 border-white bg-white object-cover shadow-lg'
            />
          </div>
        </div>

        {/* Info section */}
        <div className='ml-2 mt-12 flex flex-col md:ml-5'>
          <h2
            className={`${textColorClass} text-base font-semibold md:text-2xl`}
          >
            {name}
          </h2>
          {bio ? (
            <>
              <p className='text-xs text-gray-400 md:text-sm'>{bio}</p>
              <p className='text-xs text-gray-400 md:text-sm'>
                {city}, {country}
              </p>
            </>
          ) : (
            <div className='flex items-center gap-1'>
              <p className='text-xs text-gray-400 md:text-sm'>{industry}</p>
              <p>·</p>
              <p className='text-xs text-gray-400 md:text-sm'>
                {city}, {country}
              </p>
            </div>
          )}
        </div>
      </section>

      <div className='ml-2 md:ml-5'>
        <ProfileCardButtons
          isFollowing={true}
          buttonText='Visit Website'
          Icon={<RiShareForwardBoxFill />}
          onClick={() => window.open(UniversityData.website, '_blank')}
        />
      </div>
    </div>
  );
}

export default UniversityCard;
