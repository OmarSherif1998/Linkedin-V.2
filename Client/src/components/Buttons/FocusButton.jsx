/** @format */

import React from "react";

function FocusButton({ handleFocusChange, isFocused }) {
  return (
    <button
      onClick={handleFocusChange}
      className={`w-full border border-b-2 p-1 py-2 hover:bg-gray-100 ${
        isFocused ? "border-b-green-500" : null
      }`}
    >
      Focused
    </button>
  );
}

export default FocusButton;
