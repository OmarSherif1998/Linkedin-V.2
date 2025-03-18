/** @format */

import React, { useState } from "react";
import desk from "../../images/desk.png";
import couch from "../../images/couch.png";
function Connect() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-wrap items-center justify-evenly bg-gray-200 py-[2.5rem]">
      <div className="flex flex-col flex-wrap gap-[1.5rem]">
        <img src={couch} alt="couch.png" className="w-[21.875rem]" />
        <h1 className="w-[95%] font-sans text-[1.5625rem] font-normal">
          Connect with people who can help
        </h1>
        <button className="hover:bg-light-gray h-[3.125rem] w-[70%] rounded-[1.5625rem] border border-black px-[0.9375rem] text-lg hover:opacity-[0.8]">
          Find people you know
        </button>
      </div>

      <div className="flex flex-col flex-wrap gap-[1.5rem]">
        <img src={desk} alt="desk.png" />
        <h1 className="w-[75%] font-sans text-[1.5625rem] font-normal">
          Learn the skills you need to succeed
        </h1>
        <div className="relative inline-block">
          <button
            className="hover:bg-light-gray h-[3.125rem] w-[80%] rounded-[1.5625rem] border border-black px-[0.9375rem] text-lg hover:opacity-[0.8]"
            onClick={toggleDropdown}
          >
            Choose a topic to learn about
          </button>
          {isOpen && (
            <div className="absolute mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
              <p className="cursor-pointer p-4 hover:bg-gray-100">
                Business Analysis and Strategy
              </p>
              <p className="cursor-pointer p-4 hover:bg-gray-100">
                Business Software and Tools
              </p>
              <p className="cursor-pointer p-4 hover:bg-gray-100">
                Career Development
              </p>
              <p className="cursor-pointer p-4 hover:bg-gray-100">Web Design</p>
              <p className="cursor-pointer p-4 hover:bg-gray-100">
                Network and System Administration
              </p>
              <p className="cursor-pointer p-4 hover:bg-gray-100">
                Motion Graphics and VFX
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Connect;
