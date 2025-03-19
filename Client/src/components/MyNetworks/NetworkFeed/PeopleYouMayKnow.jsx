/** @format */

import React from "react";
import ProfileCard from "./ProfileCard";

function PeopleYouMayKnow() {
  return (
    <div className="flex h-fit flex-col gap-3 bg-white p-3 md:gap-5 md:rounded-lg md:p-5 md:shadow-lg">
      <header className="flex items-center justify-between px-1 text-sm md:px-2 md:text-lg">
        <h1>People you may know </h1>
        <button className="rounded-lg p-1 text-xs font-semibold hover:bg-gray-100 md:text-sm">
          See all
        </button>
      </header>
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-4">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </section>
    </div>
  );
}

export default PeopleYouMayKnow;
