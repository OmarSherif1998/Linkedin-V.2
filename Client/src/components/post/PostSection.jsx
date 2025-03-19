import React from "react";
import InputOption from "../Options/InputOption";
import { formInputs } from "../../staticData/PostData";

function PostSection({ profilePicture, handleForm }) {
  return (
    <div>
      <div className="flex gap-1">
        <img
          src={profilePicture}
          alt=""
          className="h-[2rem] w-[2rem] rounded-full"
        />
        <button
          onClick={handleForm}
          className="flex w-full cursor-pointer rounded-full border border-gray-500 bg-BgColor p-[0.3125rem] text-gray-600"
        >
          Start a post, try writing with AI
        </button>
      </div>
      <div className="flex justify-between py-[1rem] text-center">
        {formInputs.map((data, index) => (
          <InputOption
            Icon={data.Icon}
            color={data.color}
            title={data.title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default PostSection;
