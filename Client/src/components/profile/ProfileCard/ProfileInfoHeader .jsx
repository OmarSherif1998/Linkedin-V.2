/** @format */
import companyImage from '../../../images/defaultCompImg.jpeg';
import defaultEducation from '../../../images/defaultEducation.jpg';
import UserInfo from './UserInfo';
import ProfileCardButtons from './ProfileCardButtons';
import useThemeClasses from '../../../hooks/useThemeClasses';
import { use } from 'react';
import useNavigation from '../../../hooks/useNavigation';

function ProfileInfoHeader({
  type,
  firstName,
  lastName,
  username,
  bio,
  city,
  location,
  connectionText,
  experiences,
  education,
  user,
  currentUser,
}) {
  const companyName = experiences[0]?.company?.name;
  const companyImg = experiences[0]?.company?.profilePicture;
  const companyID = experiences[0]?.company?._id;
  const universityName = education[0]?.university?.name;
  const universityImg = education[0]?.university?.profilePicture;
  const universityID = education[0]?.university?._id;

  const { NavigateToCompany, NavigateToUniversity } = useNavigation();
  const { textColorClass } = useThemeClasses();
  return (
    <div
      className={`${textColorClass} mb-2 flex w-full flex-col gap-2 sm:mb-3 sm:gap-3 md:mb-4 md:gap-4`}
    >
      <div className='flex flex-col gap-2 md:flex-row md:justify-between md:gap-4'>
        <UserInfo
          bio={bio}
          city={city}
          location={location}
          connectionText={connectionText}
          companyName={companyName}
          education={education}
          type={type}
          firstName={firstName}
          lastName={lastName}
          username={username}
        />

        <section className='hidden min-w-[140px] flex-col gap-2 md:flex'>
          {companyName && (
            <div className='flex items-center gap-2'>
              <img
                className='rounded cursor-pointer size-8'
                src={companyImg || companyImage}
                alt=''
                onClick={() => NavigateToCompany(companyID)}
              />
              <p
                className='font-sans text-xs font-semibold truncate cursor-pointer'
                onClick={() => NavigateToCompany(companyID)}
              >
                {companyName}
              </p>
            </div>
          )}
          {universityName && (
            <div className='flex items-center gap-2'>
              <img
                className='rounded cursor-pointer size-8'
                src={universityImg || companyImage}
                alt=''
                onClick={() => NavigateToUniversity(universityID)}
              />
              <p
                className='font-sans text-xs font-semibold truncate cursor-pointer'
                onClick={() => NavigateToUniversity(universityID)}
              >
                {universityName}
              </p>
            </div>
          )}

          {education.at(-1)?.institutionName && (
            <div className='flex items-center gap-2'>
              <img className='rounded size-9' src={defaultEducation} alt='' />
              <p className='font-sans text-xs font-semibold truncate'>
                {education.at(-1)?.institutionName}
              </p>
            </div>
          )}
        </section>
      </div>
      <ProfileCardButtons type={type} user={user} currentUser={currentUser} />
    </div>
  );
}

export default ProfileInfoHeader;
