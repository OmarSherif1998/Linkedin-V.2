/** @format */

import React, { useState } from "react";

const SwitchButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => setIsActive(!isActive);

  return (
    <div
      className={`flex h-6 w-12 cursor-pointer items-center rounded-full transition ${
        isActive ? "bg-green-500" : "bg-gray-400"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow-md transition ${
          isActive ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default SwitchButton;
