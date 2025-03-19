/** @format */

import React from "react";
import profile from "../../../images/google.png";
function ProfileCard() {
  return (
    <div className="hover: flex h-[10rem] w-[10rem] flex-col border-2 md:w-[15rem]">
      <section className="relative">
        {/* Cover Picture */}
        <img
          src={profile}
          alt="Cover"
          className="h-[3rem] w-full border object-cover"
        />

        {/* Profile Picture positioned over the cover pic */}
        <img
          src={profile}
          alt="Profile"
          className="absolute -bottom-[1rem] left-5 h-[3rem] w-[3rem] rounded-full border border-white object-cover"
        />
      </section>
      <section className="p-4">
        <h1>Name</h1>
        <p className="font-thin text-gray-400">Bio</p>
      </section>
      <section className="flex items-center justify-center px-3">
        <button className="w-full rounded-full border border-LinkedInBlue text-LinkedInBlue hover:bg-gray-100">
          Follow
        </button>
      </section>
    </div>
  );
}

export default ProfileCard;
