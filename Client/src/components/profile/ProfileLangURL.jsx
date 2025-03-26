/** @format */

import EditOutlined from "@mui/icons-material/EditOutlined";
import React from "react";

function ProfileLangURL() {
  return (
    <div className="mt-[0.5rem] flex h-fit flex-col justify-around gap-5 rounded-md border border-gray-300 bg-white p-5 shadow-xl">
      <div className="flex">
        <div>
          <h1 className="text-lg font-semibold">Profile Language</h1>
          <span className="text-gray-500">English</span>
        </div>
        <div className="ml-auto">
          <EditOutlined />
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="flex">
        <div>
          <h1 className="text-lg font-semibold">Public Profile & URL</h1>
          <span className="text-xs text-gray-500">
            https://www.linkedin.com/in/omar-sherif-302225202
          </span>
        </div>
        <div className="ml-auto">
          <EditOutlined />
        </div>
      </div>
    </div>
  );
}

export default ProfileLangURL;
