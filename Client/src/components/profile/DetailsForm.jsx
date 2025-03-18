/** @format */

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDetailForm } from "../../hooks/useDetailForm";
function DetailsForm({ handleEditInfo, currentUser }) {
  const { values, setters } = useDetailForm(currentUser);
  let contactInfoRendered = false;
  const formInputs = [
    {
      label: "First Name",
      value: values.firstName,
      onchange: (e) => setters.setFirstName(e.target.value),
      required: true,
    },
    {
      label: "Last Name",
      value: values.lastName,
      onchange: (e) => setters.setLastName(e.target.value),
      required: true,
    },
    {
      label: "Bio",
      value: values.bio,
      onchange: (e) => setters.setBio(e.target.value),
      required: true,
    },
    {
      label: "Current Position",
      value: values.experience,
      onchange: (e) => setters.setExperience(e.target.value),
      required: false,
      buttonText: (
        <span className="flex items-center gap-1">
          <AddIcon /> Add a new Position
        </span>
      ),
      buttonClass: "flex gap-2   font-semibold ",
      buttonHandler: () => setters.addPosition(),
    },
    {
      label: "Education",
      value: values.education,
      onchange: (e) => setters.setEducation(e.target.value),
      required: false,
      buttonText: (
        <span className="flex items-center gap-1">
          <AddIcon /> Add a new Education
        </span>
      ),
      buttonClass: "flex gap-2 font-semibold ",
      buttonHandler: () => setters.addEducation(),
    },
    {
      label: "Location",
      value: values.location,
      onchange: (e) => setters.setLocation(e.target.value),
      required: true,
    },
    {
      label: "City",
      value: values.city,
      onchange: (e) => setters.setCity(e.target.value),
      required: true,
    },
  ];

  return (
    <div className="flex h-[30rem] w-[45rem] flex-col gap-5 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <h1 className="text-lg font-semibold">Edit Intro</h1>
        <CloseIcon
          className="m-1 cursor-pointer rounded-full p-2 hover:bg-gray-200"
          onClick={handleEditInfo}
          fontSize="large"
        />{" "}
      </div>

      <span className="flex gap-1 text-xs font-thin text-gray-400">
        <p className="text-red-500">*</p> Indicates required
      </span>
      <form className="flex flex-col gap-5 overflow-auto">
        {formInputs.map((inputs, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <label className="text-gray-500">
                {inputs.label}
                {inputs.required && <span className="text-red-500">*</span>}
              </label>

              {inputs.label === "Bio" ? (
                <textarea
                  value={inputs.value}
                  onChange={inputs.onchange}
                  className="w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin"
                  required={inputs.required}
                />
              ) : (
                <input
                  type="text"
                  value={inputs.value}
                  onChange={inputs.onchange}
                  className="w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin"
                  required={inputs.required}
                />
              )}

              {inputs.buttonText && inputs.buttonClass && (
                <button
                  className={`${inputs.buttonClass} my-5 w-fit rounded-lg p-2 text-LinkedInBlue hover:bg-blue-50 hover:text-blue-900`}
                  onClick={inputs.buttonHandler}
                >
                  {inputs.buttonText}
                </button>
              )}
            </div>
          );
        })}

        <div className="flex flex-col">
          <h1 className="text-xl font-normal">Contact Info</h1>
          <span className="font-semibold text-gray-500">
            Add or edit your profile URL, email, and more
          </span>
          <button
            onClick={setters.setContactInfo}
            className="my-5 w-fit rounded-lg p-2 text-LinkedInBlue hover:bg-blue-50 hover:text-blue-900"
          >
            Edit contact info
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            {" "}
            <h1 className="text-xl font-semibold">Website</h1>
            <span className="font-semibold text-gray-500">
              Add a link that will appear at the top of your profile{" "}
            </span>
          </div>
          <div className="flex flex-col">
            <span>Link</span>
            <input
              type="text"
              className="w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin"
            />
          </div>
        </div>
      </form>
      <div className="flex border-t border-gray-400 pt-5">
        <button className="hover:blue-900 ml-auto w-[15%] rounded-xl bg-LinkedInBlue p-2 font-semibold text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default DetailsForm;
