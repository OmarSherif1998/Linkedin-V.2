/** @format */

import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function Warning({ message, onClose }) {
  return (
    <div className="flex h-[16rem] w-[23rem] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-700">Warning</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 transition duration-200 hover:bg-red-100"
        >
          <CloseIcon sx={{ color: "red" }} />
        </button>
      </div>
      <div className="flex flex-grow items-center justify-center text-center">
        <p className="text-sm text-gray-600">{message || "Warning!"}</p>
      </div>
      <button
        onClick={onClose}
        className="mt-4 self-center rounded-full bg-red-500 px-6 py-2 text-white shadow transition duration-200 hover:bg-red-600"
      >
        OKAY
      </button>
    </div>
  );
}

export default Warning;
