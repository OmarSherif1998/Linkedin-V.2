/** @format */

import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function OpenTo() {
  return (
    <div className="ml-[1.5rem] flex h-[5rem] w-[89%] flex-col rounded-md bg-OpenToWork p-3">
      <div className="mt-[0.5rem] flex">
        <h1 className="text-sm font-semibold">Open to work</h1>
        <button className="ml-auto">
          <EditOutlinedIcon fontSize="sm" />
        </button>
      </div>
      <p>This is a placeholder for your open to work section.</p>
    </div>
  );
}

export default OpenTo;
