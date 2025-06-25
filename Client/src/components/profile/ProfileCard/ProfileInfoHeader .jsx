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
  const { NavigateToCompany } = useNavigation();
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
                className='size-8 cursor-pointer rounded'
                src={companyImg || companyImage}
                alt=''
                onClick={() => NavigateToCompany(companyID)}
              />
              <p
                className='cursor-pointer truncate font-sans text-xs font-semibold'
                onClick={() => NavigateToCompany(companyID)}
              >
                {companyName}
              </p>
            </div>
          )}

          {education.at(-1)?.institutionName && (
            <div className='flex items-center gap-2'>
              <img className='size-9 rounded' src={defaultEducation} alt='' />
              <p className='truncate font-sans text-xs font-semibold'>
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
