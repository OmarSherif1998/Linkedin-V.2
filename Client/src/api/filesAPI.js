/** @format */

import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/files`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true, // Send cookies with requests
});

const uploadPicToCloud = async (file) => {
  const formData = new FormData();
  formData.append('profilePic', file);
  try {
    const res = await axiosInstance.post('/uploadProfilePic', formData);

    return res.data;
  } catch (e) {
    console.error('FILESAPI, ERROR UPLOADING PROFILE PICTURE:', e);
  }
};
const uploadPostPicToCloud = async (file) => {
  const formData = new FormData();
  formData.append('postPic', file);
  try {
    const res = await axiosInstance.post('/uploadPostPic', formData);
    return res.data.urls[0];
  } catch (e) {
    console.error('FILESAPI, ERROR UPLOADING POST PICTURE:', e);
  }
};

export { uploadPicToCloud, uploadPostPicToCloud };
