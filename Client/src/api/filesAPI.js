/** @format */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/files",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true, // Send cookies with requests
});

const uploadPicToCloud = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file);
  try {
    console.log("API file: ", formData);

    const res = await axiosInstance.post("/uploadProfilePic", formData);
    console.log("res: ", res);
    return res.data;
  } catch (e) {
    console.error("FILES API ERRO: " + e);
  }
};
const uploadPostPicToCloud = async (file) => {
  const formData = new FormData();
  formData.append("postPic", file);
  try {
    console.log("API file: ", formData);

    const res = await axiosInstance.post("/uploadPostPic", formData);
    console.log("res: ", res);
    return res.data.urls[0];
  } catch (e) {
    console.error("FILES API ERRO: " + e);
  }
};

export { uploadPicToCloud, uploadPostPicToCloud };
