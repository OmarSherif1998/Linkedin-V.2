/** @format */

import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/sllices/userSlice";
import { useDetailForm } from "../../../hooks/useDetailForm";
import { usePicForm } from "../../../hooks/usePicForm";
import DetailsForm from "../DetailsForm/DetailsForm";
import OpenTo from "./OpenTo";
import ProfileBanner from "./ProfileBanner";
import ProfileInfoHeader from "./ProfileInfoHeader ";

function ProfileCard({ type, userDetails }) {
  const user = useSelector(selectUser);
  const { handleChangePic, isPicForm } = usePicForm();
  const { setters, PersonalInfo, ExperienceInfo, EducationInfo, forms } =
    useDetailForm(user);
  const currentUser = type === "Me" ? user : userDetails || {};
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
  return (
    <div className="flex w-full flex-col border-gray-400 bg-white pb-[2%] CustomScreen:m-auto md:gap-[2rem] md:rounded-md md:border md:shadow-lg">
      <ProfileBanner
        coverPicture={coverPicture}
        profilePicture={profilePicture}
        currentUserID={currentUser._id}
        type={type}
        handleChangePic={handleChangePic}
        isPicForm={isPicForm}
      />

      <div className="mt-[5%] flex flex-col px-4 md:mt-[3%]">
        <ProfileInfoHeader
          type={type}
          firstName={firstName}
          lastName={lastName}
          username={username}
          openDetailsForm={forms.openDetailsForm}
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
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
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

      {type === "Me" ? <OpenTo /> : null}
    </div>
  );
}

export default ProfileCard;
