import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/sllices/userSlice.js";
import { createPost } from "../api/postAPI.js";
import { getSocket } from "../Sockets/Sockets.js";
import { uploadPostPicToCloud } from "../api/filesAPI.js";
import useToken from "./useToken.js";

export const usePostModal = (handleClose) => {
  const token = useToken();
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [postPic, setPostPic] = useState(null);
  const [tempPicURL, setTempPicURL] = useState(null);
  const [isPicAvailable, setisPicAvailable] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostPic(file);
      setTempPicURL(URL.createObjectURL(file));
      setisPicAvailable(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgURL = null;
      if (postPic) {
        try {
          imgURL = await uploadPostPicToCloud(postPic);
          console.log("imgURL: ", imgURL);
        } catch (error) {
          console.log("Error uploading the pic to the cloud");
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

      const socket = getSocket();
      socket.emit("postUpdate");

      setInput("");
      setPostPic(null);
      setisPicAvailable(false);
      handleClose(e);
    } catch (error) {
      console.error("POST FORM ERROR: Error creating post:", error);
    }
  };

  return {
    input,
    postPic,
    tempPicURL,
    isPicAvailable,
    fileInputRef,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    hanldePic: () => fileInputRef.current.click(),
    user,
  };
};
