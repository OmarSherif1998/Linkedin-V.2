function CompanyBanner({ coverPicture, profilePicture }) {
  return (
    <div className='relative'>
      <img
        src={coverPicture}
        alt='coverPicture'
        className='w-full h-fit lg:rounded-t-md'
      />

      <img
        src={profilePicture}
        alt='profilePicture'
        className={
          'absolute left-[2%] top-[50%] z-30 size-[3rem] cursor-pointer border-[2px] border-gray-700 object-cover sm:size-[5rem] md:size-[6.5rem] lg:top-[40%] lg:size-[8rem] 2xl:top-[55%] 2xl:size-[10rem]'
        }
      />
    </div>
  );
}

export default CompanyBanner;
