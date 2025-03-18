/** @format */

import React, { useRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function SimpleFileUpload() {
  const fileInputRef = useRef(null);

  // Function to trigger the hidden file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Outputs the selected file information
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the actual file input
        accept="image/*" // Restricts to image files only
      />
      <button
        onClick={handleButtonClick}
        className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50 hover:bg-opacity-5"
      >
        <CameraAltIcon />
        Add Photo
      </button>
    </div>
  );
}

export default SimpleFileUpload;
