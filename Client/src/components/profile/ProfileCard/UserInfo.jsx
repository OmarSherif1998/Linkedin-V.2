import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import useThemeClasses from '../../../hooks/useThemeClasses';

function UserInfo({
  bio,
  city,
  country,
  connectionText,
  companyName,
  education,
  type,
  firstName,
  lastName,
  username,
}) {
  const { textColorClass } = useThemeClasses();
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1 sm:gap-2'>
        <section className='flex items-center gap-1'>
          <h1 className='text-base font-semibold truncate sm:text-lg md:text-2xl'>
            {type === 'Me' ? `${firstName} ${lastName}` : username}
          </h1>
          <VerifiedUserOutlinedIcon fontSize='small' />
        </section>
        <p className={`text-xs ${textColorClass} sm:text-sm md:text-base`}>
          {bio}
        </p>
      </div>
      <div className='flex gap-1 mt-2 text-xs md:hidden'>
        <p className='truncate'>{companyName}</p>
        <p className='text-xs'>•</p>
        <p className='truncate'>{education.at(-1)?.institutionName}</p>
      </div>
      <div className='flex items-center gap-1 mt-1'>
        {city || country ? (
          <>
            <p className='text-xs text-gray-400 sm:text-sm'>
              {city}
              {city && country ? ',' : ''} {country}
            </p>
            <p className='text-xs'>•</p>
          </>
        ) : null}
        <button className='text-xs font-semibold text-LinkedInBlue hover:underline sm:text-sm'>
          Contact Info
        </button>
      </div>
      <button className='mt-1 text-xs font-normal text-LinkedInBlue sm:text-sm'>
        {connectionText === 0 ? '' : connectionText}
      </button>
    </div>
  );
}

export default UserInfo;
