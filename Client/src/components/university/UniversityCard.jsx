import useThemeClasses from '../../hooks/useThemeClasses';

function UniversityCard({ UniversityData }) {
  const { componentBGColorClass, borderClass, textColorClass } =
    useThemeClasses();
  const { coverPicture, profilePicture, bio, city, country, name } =
    UniversityData;

  console.log(UniversityData);
  return (
    <div
      className={`${componentBGColorClass} w-full flex-col pb-[3%] md:flex lg:rounded-t-md CustomScreen:m-auto md:${borderClass} `}
    >
      {/* Banner section */}
      <div className='relative w-full h-32 bg-gray-300 lg:rounded-t-md'>
        {coverPicture && (
          <img
            src={coverPicture}
            alt='University Cover'
            className='object-cover w-full h-full lg:rounded-t-md'
          />
        )}
        <div className='absolute flex items-end -bottom-10 left-6'>
          <img
            src={profilePicture}
            alt='University Profile'
            className='object-cover w-24 h-24 bg-white border-4 border-white rounded-full shadow-lg'
          />
        </div>
      </div>
      {/* Info section */}
      <div className='flex flex-col mt-12 ml-5'>
        <h2 className={`${textColorClass} text-2xl font-semibold`}>{name}</h2>
        <p className='text-sm text-gray-400'>{bio}</p>
        <p className='text-sm text-gray-400'>
          {city}, {country}
        </p>
      </div>
    </div>
  );
}

export default UniversityCard;
