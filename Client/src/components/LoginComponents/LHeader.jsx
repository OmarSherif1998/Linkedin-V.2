/** @format */
import React from "react";

import Headeroptions from "../Options/Headeroptions";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
function LHeader() {
  return (
    <div className="flex justify-between gap-[1.25rem] p-[1.25rem]">
      <img
        src={require("../../images/linkedin.png")}
        alt=""
        className="h-[2rem] w-[7.25rem]"
      />

      <div className="flex gap-[1.25rem]">
        <Headeroptions Icon={NewspaperIcon} title="Articles" />
        <Headeroptions Icon={PeopleAltIcon} title="People" />
        <Headeroptions Icon={SchoolIcon} title="Learning" />
        <Headeroptions Icon={SupervisorAccountIcon} title="Jobs" />

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
