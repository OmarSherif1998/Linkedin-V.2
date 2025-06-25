import useThemeClasses from '../../hooks/useThemeClasses';

function UniversityCard({ UniversityData }) {
  const { componentBGColorClass, borderClass } = useThemeClasses();
  const { coverPicture, profilePicture, bio, city, country, name } =
    UniversityData;
  return (
    <div
      className={`${componentBGColorClass} w-full flex-col pb-[3%] md:flex lg:rounded-t-md CustomScreen:m-auto md:${borderClass} `}
    >
      {/* Banner section */}
      <div className='relative h-32 w-full bg-gray-300 lg:rounded-t-md'>
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
            className='h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-lg'
          />
        </div>
      </div>
      {/* Info section */}
      <div className='ml-5 mt-12 flex flex-col'>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <p className='text-sm text-gray-400'>{bio}</p>
        <p className='text-sm text-gray-400'>
          {city}, {country}
        </p>
      </div>
    </div>
  );
}

export default UniversityCard;
