/** @format */

import React from "react";

const PostJob = () => {
  return (
    <div className="hidden w-full flex-col items-center bg-[#f1ece5] py-[15rem] md:flex">
      <h1 className="mb-[2rem] w-[80%] text-center font-sans text-[2.5rem] font-normal text-CrimsonRed">
        Post your job for millions of people to see
      </h1>
      <button className="h-[3.5rem] w-[8rem] rounded-full border border-CrimsonRed text-xl text-CrimsonRed transition-colors duration-300 hover:bg-CrimsonRed hover:text-white">
        Post a Job
      </button>
    </div>
  );
};

export default PostJob;
