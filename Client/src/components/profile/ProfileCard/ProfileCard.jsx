/** @format */

import { useDetailForm } from '../../../hooks/useDetailForm';
import DetailsForm from '../DetailsForm/DetailsForm';
import OpenTo from './OpenTo';
import ProfileBanner from './ProfileBanner';
import ProfileInfoHeader from './ProfileInfoHeader ';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useScrollLock from '../../../hooks/useScrollLock';

function ProfileCard({ userDetails }) {
  const { componentBGColorClass, borderClass } = useThemeClasses();
  const { setters, PersonalInfo, ExperienceInfo, EducationInfo, forms } =
    useDetailForm(userDetails);
  const currentUser = userDetails || {};
  const {
    coverPicture,
    profilePicture,
    username,
    bio,
    city,
    country,
    connectionCount,
    connectionStatus,
    experiences,
    education,
  } = currentUser;
  useScrollLock(forms.isDetailsForm);
  return (
    <div
      className={`w-full flex-col border-gray-400 ${componentBGColorClass} pb-[2%] md:flex md:rounded-md CustomScreen:m-auto md:${borderClass} shadow-lg`}
    >
      <ProfileBanner
        coverPicture={coverPicture}
        profilePicture={profilePicture}
        currentUserID={currentUser._id}
        connectionStatus={connectionStatus}
        openDetailsForm={forms.openDetailsForm}
      />

      <div className='ml-[1%] flex flex-col px-4 2xl:mt-[2%]'>
        <ProfileInfoHeader
          username={username}
          bio={bio}
          city={city}
          country={country}
          connectionCount={connectionCount}
          experiences={experiences}
          education={education}
          currentUser={currentUser}
          connectionStatus={connectionStatus}
        />

        {forms.isDetailsForm === true ? (
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <DetailsForm
              currentUser={currentUser}
              openExperienceForm={forms.openExperienceForm}
              openEducationForm={forms.openEducationForm}
              closeForm={forms.closeForm}
              PersonalInfo={PersonalInfo}
              ExperienceInfo={ExperienceInfo}
              EducationInfo={EducationInfo}
              forms={forms}
              setters={setters}
            />
          </div>
        ) : null}
      </div>

      {connectionStatus === 'self' ? <OpenTo /> : null}
    </div>
  );
}

export default ProfileCard;
