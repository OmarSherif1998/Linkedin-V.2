/** @format */

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Headeroptions from "../Options/Headeroptions";
import linkedinSquare from "../../images/icons8-linkedin-96.png";
import { useLocation } from "react-router-dom";
import { headerInputs, PreumiumInput } from "../../staticData/HeaderData";
import { useNavigation } from "../../hooks/useNavigation";
function Header() {
  const { NavigateToHome } = useNavigation();
  const location = useLocation();

  return (
    <div className="border-light-gray sticky top-0 z-[999] mb-6 flex h-[4rem] w-full items-center border-b bg-white px-4 sm:px-6 md:px-8">
      <div className="flex items-center mr-auto">
        <button onClick={NavigateToHome}>
          <img
            src={linkedinSquare}
            alt="linkedin logo"
            className="w-[2.5rem] object-cover sm:w-[3rem]"
          />
        </button>
        <div className="hidden w-full items-center rounded-md bg-[#eef3f8] px-2 py-2 text-gray-600 sm:w-[20rem] md:flex">
          <SearchIcon className="text-gray-500" />
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="w-full ml-2 text-sm bg-transparent border-none outline-none"
          />
        </div>
      </div>
      <div className="justify-between hidden gap-2 sm:flex">
        {headerInputs.map((data, index) => (
          <Headeroptions
            key={index}
            Icon={data.Icon}
            title={data.title}
            avatar={data.avatar}
            location={location.pathname}
          />
        ))}
        <div className="flex gap-3 pl-2 border-l border-gray-300">
          {PreumiumInput.map((data, index) => (
            <Headeroptions
              key={index}
              Icon={data.Icon}
              title={data.title}
              isDropdown={data.isDropdown}
              isSpecial={data.isSpecial}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
