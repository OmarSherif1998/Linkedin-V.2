/** @format */
import companyImage from '../../../images/defaultCompImg.jpeg';
import UniversityImage from '../../../images/defaultEducation.jpg';
import UserInfo from './UserInfo';
import ProfileCardButtons from './ProfileCardButtons';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useNavigation from '../../../hooks/useNavigation';

function ProfileInfoHeader({
  type,
  username,
  bio,
  city,
  country,
  connectionCount,
  experiences = [],
  education = [],
  currentUser,
  connectionStatus,
}) {
  const companyName = experiences[0]?.company?.name;
  const companyImg = experiences[0]?.company?.profilePicture;
  const companyID = experiences[0]?.company?._id;
  const universityName = education[0]?.university?.name;
  const universityImg = education[0]?.university?.profilePicture;
  const universityID = education[0]?.university?._id;

  const { NavigateToCompany, NavigateToUniversity } = useNavigation();
  const { textColorClass } = useThemeClasses();
  console.log(connectionStatus);

  return (
    <div
      className={`${textColorClass} mb-2 ml-[2%] flex w-full flex-col gap-2 sm:mb-3 sm:gap-3 md:mb-4 md:gap-1 md:px-7 2xl:mt-[2%]`}
    >
      <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
        <UserInfo
          bio={bio}
          city={city}
          country={country}
          connectionCount={connectionCount}
          companyName={companyName}
          universityName={universityName}
          username={username}
        />
        <section className='hidden min-w-[140px] flex-col gap-2 md:flex'>
          {companyName && (
            <div className='flex items-center gap-2'>
              <img
                className='size-6 cursor-pointer rounded 2xl:size-8'
                src={companyImg || companyImage}
                alt=''
                onClick={() => NavigateToCompany(companyID)}
              />
              <p
                className='cursor-pointer font-sans text-xs font-semibold'
                onClick={() => NavigateToCompany(companyID)}
              >
                {companyName}
              </p>
            </div>
          )}
          {universityName && (
            <div className='flex items-center gap-2'>
              <img
                className='size-7 cursor-pointer rounded 2xl:size-8'
                src={universityImg || UniversityImage}
                alt=''
                onClick={() => NavigateToUniversity(universityID)}
              />
              <p
                className='cursor-pointer font-sans text-xs font-semibold'
                onClick={() => NavigateToUniversity(universityID)}
              >
                {universityName}
              </p>
            </div>
          )}
        </section>
      </div>
      <ProfileCardButtons
        connectionStatus={connectionStatus}
        connectionID={currentUser._id}
      />
    </div>
  );
}

export default ProfileInfoHeader;
