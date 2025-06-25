/** @format */

import { useDetailForm } from '../../../hooks/useDetailForm';
import DetailsForm from '../DetailsForm/DetailsForm';
import OpenTo from './OpenTo';
import ProfileBanner from './ProfileBanner';
import ProfileInfoHeader from './ProfileInfoHeader ';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useUser from '../../../hooks/useUser';
import useScrollLock from '../../../hooks/useScrollLock';

function ProfileCard({ type, userDetails }) {
  const user = useUser();
  const { componentBGColorClass, borderClass } = useThemeClasses();
  const { setters, PersonalInfo, ExperienceInfo, EducationInfo, forms } =
    useDetailForm(user);
  const currentUser = type === 'Me' ? user : userDetails || {};
  const {
    coverPicture,
    profilePicture,
    firstName,
    lastName,
    username,
    bio,
    city,
    location,
    connectionCount,
    experiences,
    education,
  } = currentUser;
  const connectionText =
    connectionCount === 0 ? `0 connections` : `${connectionCount} connections`;
  useScrollLock(forms.isDetailsForm);
  return (
    <div
      className={`${componentBGColorClass} w-full flex-col border-gray-400 pb-[2%] md:flex md:rounded-md CustomScreen:m-auto md:${borderClass} shadow-lg`}
    >
      <ProfileBanner
        coverPicture={coverPicture}
        profilePicture={profilePicture}
        currentUserID={currentUser._id}
        type={type}
        openDetailsForm={forms.openDetailsForm}
      />

      <div className='ml-[1%] mt-[5%] flex flex-col px-4 md:mt-0'>
        <ProfileInfoHeader
          type={type}
          firstName={firstName}
          lastName={lastName}
          username={username}
          bio={bio}
          city={city}
          location={location}
          connectionText={connectionText}
          experiences={experiences}
          education={education}
          user={user}
          currentUser={currentUser}
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

      {type === 'Me' ? <OpenTo /> : null}
    </div>
  );
}

export default ProfileCard;
