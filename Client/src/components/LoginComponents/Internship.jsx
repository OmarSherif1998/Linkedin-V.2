/** @format */

import React from "react";

function Internship() {
  const buttonData = [
    "Engineering",
    "Bussiness Development",
    "Finance",
    "Adminstative Assistant",
    "Retail Associate",
    "Customer Service",
    "Operations",
    "Information technology",
    "Marketing",
    "Human Resources",
    "Show more",
  ];

  return (
    <div className="flex w-full flex-col bg-[#f3f2f0] py-[10rem]">
      <div className="mb-[3rem] text-center font-sans text-[3rem] font-thin text-black">
        <h1>Find the right job or internship for you</h1>
      </div>

      <div className="flex flex-col items-center px-[2.5rem]">
        <h4 className="mb-[1.25rem] font-sans text-[1rem] font-semibold uppercase leading-[1.25] text-black">
          Suggested Searches
        </h4>
        <div className="flex flex-wrap gap-[0.5rem]">
          {buttonData.map((data, index) => (
            <button
              key={index}
              className="h-[3.125rem] rounded-full border border-black bg-transparent px-[1rem] py-[0.5rem] text-lg text-black transition-colors duration-300 hover:bg-gray-200"
            >
              {data}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Internship;
