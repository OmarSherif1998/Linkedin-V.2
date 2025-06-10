import React from "react";
import InputOption from "../Options/InputOption.jsx";
import { formInputs } from "../../staticData/PostData.js";

import useThemeClasses from "../../hooks/useThemeClasses.js";

function PostSection({ profilePicture, handleForm }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <div className={`${componentBGColorClass}`}>
      <div className="flex gap-1">
        <img
          src={profilePicture}
          alt=""
          className="h-[2rem] w-[2rem] rounded-full"
        />
        <button
          onClick={handleForm}
          className={`flex w-full cursor-pointer rounded-full border border-gray-500 p-[0.3125rem] ${textColorClass} ${componentBGColorClass}`}
        >
          Start a post, try writing with AI
        </button>
      </div>
      <div
        className={`${componentBGColorClass} flex justify-between py-[1rem] text-center`}
      >
        {formInputs.map((data, index) => (
          <InputOption
            Icon={data.Icon}
            color={data.color}
            title={data.title}
            key={index}
            componentName={"PostSection"}
          />
        ))}
      </div>
    </div>
  );
}

export default PostSection;
