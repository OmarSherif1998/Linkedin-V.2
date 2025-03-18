/** @format */

import React, { useState } from "react";
import PicForm from "../PicForm";
import { useHandlers } from "../../../hooks/useHandlers";
import coverPic from "../../../images/coverPic.jpg";
function ProfileBanner({ coverPicture, profilePicture, currentUserID, type }) {
  const { handleChangePic, isPicForm } = useHandlers(); // It was originally placed in ProfileCard
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  console.log(screenSize);
  return (
    <div className="relative">
      <img
        src={coverPicture ? coverPicture : coverPic}
        alt="coverPicture"
        className="h-auto w-full rounded-t-md"
      />

      <img
        src={profilePicture}
        alt="profilePicture"
        className={`absolute left-[7rem] top-[5.5rem] z-30 size-[10rem] -translate-x-[6rem] translate-y-[.2rem] transform cursor-pointer rounded-full border-[0.3rem] border-white object-cover lg:top-[7rem] 2xl:top-[6rem] 2xl:size-[15rem]`}
        onClick={type === "Me" ? handleChangePic : undefined}
      />

      {isPicForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PicForm
            handleChangePic={handleChangePic}
            currentUserID={currentUserID}
            profilePicture={profilePicture}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileBanner;
