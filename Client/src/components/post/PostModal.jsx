import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PostOptions from "./PostOptions";
import { usePostModal } from "../../hooks/usePostModal";

function PostModal({ handleClose }) {
  const {
    input,
    user,
    tempPicURL,
    isPicAvailable,
    fileInputRef,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    hanldePic,
  } = usePostModal(handleClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mt-[5rem] flex h-fit w-[42rem] flex-col overflow-auto overscroll-auto rounded-lg bg-white p-4 align-bottom shadow-lg">
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          <CloseOutlinedIcon />
        </button>
        <div className="mb-4 flex items-center">
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="mr-2 h-12 w-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">Post to Anyone</p>
          </div>
        </div>
        <div className="h-fit">
          <textarea
            className="h-40 w-full resize-none rounded-lg border border-gray-400 p-2 text-lg placeholder-gray-500 focus:outline-none"
            placeholder="What do you want to talk about?"
            onChange={handleInputChange}
            value={input}
          />
          {isPicAvailable && (
            <div className="flex justify-center">
              <img src={tempPicURL} alt="" className="h-[15rem] w-fit" />
            </div>
          )}
        </div>

        <PostOptions
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          input={input}
          hanldePic={hanldePic}
        />
      </div>
    </div>
  );
}

export default PostModal;
