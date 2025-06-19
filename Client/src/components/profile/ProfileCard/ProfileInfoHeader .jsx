/** @format */
import companyImage from '../../../images/defaultCompImg.jpeg';
import defaultEducation from '../../../images/defaultEducation.jpg';
import UserInfo from './UserInfo';
import ProfileCardButtons from './ProfileCardButtons';
import useThemeClasses from '../../../hooks/useThemeClasses';

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
  const companyName = experiences[0]?.company[0]?.name;
  const companyImg = experiences[0]?.company[0]?.profilePicture;

  const { textColorClass } = useThemeClasses();
  return (
    <div className={`${textColorClass} mb-3 flex flex-col`}>
      <div className='flex justify-between'>
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

        <section className='hidden flex-col gap-2 md:flex'>
          {companyName && (
            <div className='flex items-center gap-1'>
              <img className='size-8' src={companyImg || companyImage} alt='' />
              <p className='font-sans text-xs font-semibold'>{companyName}</p>
            </div>
          )}

          {education.at(-1)?.institutionName && (
            <div className='flex items-center gap-1'>
              <img className='size-9' src={defaultEducation} alt='' />
              <p className='font-sans text-xs font-semibold'>
                {education.at(-1)?.institutionName}
              </p>{' '}
            </div>
          )}
        </section>
      </div>
      <ProfileCardButtons type={type} user={user} currentUser={currentUser} />
    </div>
  );
}

export default ProfileInfoHeader;
