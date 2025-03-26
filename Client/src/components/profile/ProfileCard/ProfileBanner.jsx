/** @format */

import PicForm from "../PicForm";
import { usePicForm } from "../../../hooks/usePicForm";
import coverPic from "../../../images/coverPic.jpg";
import { useEffect, useState } from "react";
function ProfileBanner({ coverPicture, profilePicture, currentUserID, type }) {
  const { handleChangePic, isPicForm } = usePicForm(); // It was originally placed in ProfileCard
  const [img, setImg] = useState(profilePicture);

  useEffect(() => {
    setImg(profilePicture);
  }, [profilePicture]);
  return (
    <div className="relative h-[7rem] w-full lg:h-[15rem] 2xl:h-[18rem]">
      <img
        src={coverPicture ? coverPicture : coverPic}
        alt="coverPicture"
        className="w-full h-auto md:rounded-t-md"
      />

      <img
        src={img}
        alt="profilePicture"
        className={`absolute left-[5rem] top-[2.5rem] z-30 size-[5rem] -translate-x-[3rem] translate-y-[.1rem] transform cursor-pointer rounded-full border-[0.3rem] border-white object-cover md:left-[7rem] md:top-[5.5rem] md:size-[10rem] md:-translate-x-[6rem] md:translate-y-[.2rem] lg:top-[7rem] 2xl:top-[6rem] 2xl:size-[15rem]`}
        onClick={type === "Me" ? handleChangePic : undefined}
      />

      {isPicForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PicForm
            handleChangePic={handleChangePic}
            currentUserID={currentUserID}
            profilePicture={img}
            setImg={setImg}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileBanner;
