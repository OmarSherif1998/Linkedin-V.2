/** @format */

import React from "react";

function ButtonComponent({ buttonClass, buttonHandler, buttonText }) {
  return (
    <button
      className={`${buttonClass} my-5 w-fit rounded-lg p-2 text-LinkedInBlue hover:bg-blue-50 hover:text-blue-900`}
      onClick={buttonHandler}
    >
      {buttonText}
    </button>
  );
}

export default ButtonComponent;
