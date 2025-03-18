/** @format */

import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/sllices/userSlice";
import { useDetailForm } from "../../../hooks/useDetailForm";
import DetailsForm from "../DetailsForm/DetailsForm";

import OpenTo from "./OpenTo";
import ProfileCardButtons from "./ProfileCardButtons";
import ProfileBanner from "./ProfileBanner";
import ProfileInfoHeader from "./ProfileInfoHeader ";
import { useHandlers } from "../../../hooks/useHandlers";

function ProfileCard({ type, userDetails }) {
  const user = useSelector(selectUser);
  const { handleChangePic, isPicForm } = useHandlers();
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
  } = currentUser;
  const connectionText =
    connectionCount === 0 ? `0 connections` : `${connectionCount} connections`;

  return (
    <div className="mt-[0.5rem] flex flex-col gap-[2rem] rounded-md border border-gray-400 bg-white pb-[2rem] shadow-lg CustomScreen:m-auto">
      <ProfileBanner
        coverPicture={coverPicture}
        profilePicture={profilePicture}
        currentUserID={currentUser._id}
        type={type}
        handleChangePic={handleChangePic}
        isPicForm={isPicForm}
      />

      <div className="mt-3 flex flex-col px-4 2xl:mt-7">
        <ProfileInfoHeader
          type={type}
          firstName={firstName}
          lastName={lastName}
          username={username}
          openDetailsForm={forms.openDetailsForm}
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
        <div>
          <p className="text-md">{bio}</p>
          <div className="flex items-center gap-1">
            {city || location ? (
              <>
                <p className="text-sm text-gray-600">
                  {city}, {location}
                </p>
                <p className="text-xs">•</p>
              </>
            ) : null}

            <button className="text-sm font-semibold text-LinkedInBlue hover:underline">
              Contact Info
            </button>
          </div>
          <button className="mt-[0.4rem] text-sm font-normal text-LinkedInBlue">
            {connectionText}
          </button>
        </div>
      </div>

      <ProfileCardButtons type={type} user={user} currentUser={currentUser} />
      {type === "Me" ? <OpenTo /> : null}
    </div>
  );
}

export default ProfileCard;
