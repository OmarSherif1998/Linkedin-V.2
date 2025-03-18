/** @format */

import React from "react";
import ProfileCard from "./ProfileCard";

function PeopleYouMayKnow() {
  return (
    <div className="flex h-fit flex-col gap-5 rounded-lg bg-white p-5 shadow-lg">
      <header className="flex items-center justify-between px-2">
        <h1>People you may know from The British University in Egypt</h1>
        <button className="rounded-lg p-1 font-semibold hover:bg-gray-100">
          See all
        </button>
      </header>
      <section className="grid grid-cols-3 gap-3">
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
