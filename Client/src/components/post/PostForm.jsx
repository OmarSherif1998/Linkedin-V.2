/** @format */

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/sllices/userSlice.js";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { createPost } from "../../api/postAPI.js";
import { initializeSocket } from "../../Sockets/Sockets.js";
import { uploadPostPicToCloud } from "../../api/filesAPI.js";

function PostForm({ handleClose }) {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [postPic, setPostPic] = useState(null);
  const [tempPicURL, setTempPicURL] = useState(null);
  const [isPicAvailable, setisPicAvailable] = useState(false);

  const fileInputRef = useRef(null);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let imgURL = null;
      if (postPic) {
        try {
          imgURL = await uploadPostPicToCloud(postPic);
          console.log("imgURL: ", imgURL);
        } catch (error) {
          console.log("error uploading the pic to the cloud");
        }
      }

      await createPost(
        [
          {
            content: input,
            postPic: imgURL || [],
            username: user.firstName + " " + user.lastName,
            bio: user.bio,
            profilePicture: user.profilePicture,
          },
        ],
        token,
      );
      const socket = initializeSocket();
      socket.emit("postUpdate");
      setInput("");
      setPostPic(null);
      setisPicAvailable(false);
      handleClose(e);
    } catch (error) {
      console.error("POST FORM ERROR: Error creating post:", error);
    }
  };
  const hanldePic = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostPic(file);
      setTempPicURL(URL.createObjectURL(file));
      setisPicAvailable(true);
    }
  };

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
          {isPicAvailable === true ? (
            <div className="flex justify-center">
              <img src={tempPicURL} alt="" className="h-[15rem] w-fit" />
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*" // Optional: restrict file types
            />
            <ImageOutlinedIcon
              className="cursor-pointer rounded-lg text-blue-500 hover:bg-gray-300"
              onClick={hanldePic}
            />
            <MoodOutlinedIcon className="cursor-pointer text-yellow-500" />
            <MoreHorizOutlinedIcon className="cursor-pointer text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <AccessTimeOutlinedIcon className="text-gray-500" />
            <button
              onClick={handleSubmit} // Correctly call handleSubmit
              className={`cursor-pointer rounded-full bg-blue-600 px-4 py-1 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 ${
                !input.trim() ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={!input.trim() ? true : false}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
