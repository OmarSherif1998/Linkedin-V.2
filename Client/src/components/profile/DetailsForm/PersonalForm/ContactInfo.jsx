/** @format */

import React from "react";

const ContactInfo = ({ setContactInfo }) => (
  <div className="flex flex-col">
    <h1 className="text-xl font-normal">Contact Info</h1>
    <span className="font-semibold text-gray-500">
      Add or edit your profile URL, email, and more
    </span>
    <button
      onClick={setContactInfo}
      className="my-5 w-fit rounded-lg p-2 text-LinkedInBlue hover:bg-blue-50 hover:text-blue-900"
    >
      Edit contact info
    </button>
  </div>
);

export default ContactInfo;
