/** @format */

import PicForm from "../PicForm";
import { usePicForm } from "../../../hooks/usePicForm";
import coverPic from "../../../images/coverPic.jpg";
import { useEffect, useState } from "react";

function ProfileBanner({ coverPicture, profilePicture, currentUserID, type }) {
  const { handleChangePic, isPicForm } = usePicForm();
  const [img, setImg] = useState(profilePicture);

  useEffect(() => {
    setImg(profilePicture);
  }, [profilePicture]);

  return (
    <div className="relative h-[7rem] md:h-[12rem] lg:h-[15rem] 2xl:h-[22rem]">
      <img
        src={coverPicture ? coverPicture : coverPic}
        alt="coverPicture"
        className="h-full w-full object-cover md:rounded-t-md"
      />

      <img
        src={img}
        alt="profilePicture"
        className={
          "bg-whit absolute left-[2%] top-[50%] z-30 size-[5rem] cursor-pointer rounded-full border-[0.3rem] bg-white object-cover md:size-[8rem] lg:size-[10rem] 2xl:size-[15rem]"
        }
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
