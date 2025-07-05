import NotificationsIcon from '@mui/icons-material/Notifications';

function CompanyBanner({ coverPicture, profilePicture }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        <img
          src={coverPicture}
          alt='coverPicture'
          className='h-fit w-full lg:rounded-t-md'
        />

        <img
          src={profilePicture}
          alt='profilePicture'
          className={
            'absolute left-[2%] top-[65%] z-30 size-[3rem] cursor-pointer border border-gray-400 object-cover sm:size-[5rem] md:size-[5rem] lg:top-[40%] lg:size-[6rem] 2xl:top-[55%] 2xl:size-[7rem]'
          }
        />
      </div>

      <NotificationsIcon
        sx={{ color: 'gray' }}
        fontSize='medium'
        className='ml-auto mr-2'
      />
    </div>
  );
}

export default CompanyBanner;
