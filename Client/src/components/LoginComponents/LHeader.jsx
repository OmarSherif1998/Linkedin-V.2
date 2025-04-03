/** @format */
import React from "react";

import Headeroptions from "../Options/Headeroptions";

import { Link } from "react-router-dom";
import { LHeaderData } from "../../staticData/LHeaderData";
function LHeader() {
  return (
    <div className="flex justify-between gap-[1.25rem] p-[1.25rem]">
      <img
        src={require("../../images/linkedin.png")}
        alt=""
        className="h-[2rem] w-[7.25rem]"
      />

      <div className="flex gap-[1.25rem]">
        <div className="hidden gap-[1.25rem] md:flex">
          {LHeaderData.map((data, idx) => (
            <Headeroptions key={idx} title={data.title} Icon={data.icon} />
          ))}
        </div>

        <button className="w-[7rem] rounded-full border border-LinkedInBlue hover:cursor-pointer hover:bg-gray-100">
          <Link to="/signup">Join now</Link>
        </button>
        <button className="w-[7rem] rounded-full border border-LinkedInBlue hover:cursor-pointer hover:bg-LinkedInBlue hover:text-white">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default LHeader;
