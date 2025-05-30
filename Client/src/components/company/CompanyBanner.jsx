function CompanyBanner({ coverPicture, profilePicture }) {
  return (
    <div className="relative h-[50%]">
      <img
        src={coverPicture}
        alt="coverPicture"
        className="h-fit w-full pb-10 lg:rounded-t-md"
      />

      <img
        src={profilePicture}
        alt="profilePicture"
        className={
          "absolute left-[2%] top-[30%] z-30 size-[3rem] cursor-pointer border object-cover sm:size-[5rem] md:size-[6.5rem] lg:size-[8rem] 2xl:top-[50%] 2xl:size-[10rem]"
        }
      />
    </div>
  );
}

export default CompanyBanner;
