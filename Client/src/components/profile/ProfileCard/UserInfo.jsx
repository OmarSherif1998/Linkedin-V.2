import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

function UserInfo({
  bio,
  city,
  location,
  connectionText,
  companyName,
  education,
  type,
  firstName,
  lastName,
  username,
}) {
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <section className='flex items-center gap-1'>
            <h1 className='truncate font-semibold md:text-2xl'>
              {type === 'Me' ? `${firstName} ${lastName}` : username}
            </h1>
            <VerifiedUserOutlinedIcon fontSize='small' />
          </section>
          <p className='md:text-md text-xs'>{bio}</p>
        </div>
      </div>
      <div className='mt-3 flex gap-1 text-xs md:hidden'>
        <p>{companyName}</p>
        <p className='text-xs'>•</p>

        <p>{education.at(-1)?.institutionName}</p>
      </div>

      <div className='flex items-center gap-1'>
        {city || location ? (
          <>
            <p className='text-sm text-gray-600'>
              {city}, {location}
            </p>
            <p className='text-xs'>•</p>
          </>
        ) : null}

        <button className='text-sm font-semibold text-LinkedInBlue hover:underline'>
          Contact Info
        </button>
      </div>
      <button className='text-sm font-normal text-LinkedInBlue'>
        {connectionText}
      </button>
    </div>
  );
}

export default UserInfo;
