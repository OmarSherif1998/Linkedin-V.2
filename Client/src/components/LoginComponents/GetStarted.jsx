/** @format */

import React from "react";

function GetStarted() {
  return (
    <div className="mt-[0.625rem] hidden h-[34.375rem] w-full flex-col items-start gap-[1.25rem] bg-[url('../images/wallpaper.jpg')] bg-contain px-[2.5rem] py-[4rem] md:flex md:px-[5rem] lg:px-[10rem] 2xl:h-[43.75rem] 2xl:py-[5rem]">
      <h1 className="max-w-[50rem] text-[2.25rem] font-light leading-tight 2xl:max-w-[68.75rem] 2xl:text-[3.125rem]">
        Join your colleagues, classmates, and friends on LinkedIn.
      </h1>
      <button className="h-[3.125rem] w-[10.3125rem] rounded-full bg-[#0a66c2] text-lg text-white">
        Get started
      </button>
    </div>
  );
}

export default GetStarted;
