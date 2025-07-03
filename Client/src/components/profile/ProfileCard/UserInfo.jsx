import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import useThemeClasses from '../../../hooks/useThemeClasses';

function UserInfo({
  bio,
  city,
  country,
  connectionCount,
  companyName,
  universityName,
  username,
}) {
  const { textColorClass } = useThemeClasses();
  return (
    <div className='w-fit'>
      <div className='flex flex-col'>
        <section className='flex items-center gap-1'>
          <h1 className='xs:text-base truncate text-base font-[400] sm:text-lg xl:text-xl 2xl:text-2xl'>
            {username}
          </h1>
          <VerifiedUserOutlinedIcon fontSize='small' />
        </section>
        <p
          className={`${textColorClass} text-xs sm:text-sm md:text-[11px] xl:text-base`}
        >
          {bio}
        </p>
      </div>

      {(universityName || companyName) && (
        <div className='flex gap-1 mt-2 text-xs md:hidden'>
          <p className='truncate'>{companyName}</p>
          {universityName && companyName && <p className='text-xs'>•</p>}
          <p className='truncate'>{universityName}</p>
        </div>
      )}
      <div className='flex items-center gap-1 mt-1'>
        {city || country ? (
          <>
            <p className='text-sm text-gray-400 sm:text-xs'>
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
      {connectionCount > 0 ? (
        <button className='mt-1 text-xs font-normal text-LinkedInBlue sm:text-sm'>
          connectionCount
        </button>
      ) : null}
    </div>
  );
}

export default UserInfo;
