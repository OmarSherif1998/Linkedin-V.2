import axios from "axios";
import { PROD_BASE_URL } from "./baseURL";

const axiosInstance = axios.create({
  baseURL: `${PROD_BASE_URL}/support`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

const verifyEmailAndSendOTP = async (email) => {
  const response = await axiosInstance.post("/sendOTP", { email });
  return response.data;
};

const verifyOTP = async (email, otp) => {
  const response = await axiosInstance.post("/verifyOTP", { email, otp });
  return response.data;
};

const resetPassword = async (newPassword, userID) => {
  const response = await axiosInstance.post("/resetPassword", {
    newPassword,
    userID,
  });
  return response.data;
};

const sendVerificationEmail = async (email, _id) => {
  const response = await axiosInstance.post("/sendVerificationEmail", {
    email,
    _id,
  });
  return response.data;
};

const verifyAccount = async (token) => {
  const response = await axiosInstance.post(`/verifyAccount/${token}`);
  return response;
};

const setDarkModePreference = async (userID) => {
  const response = await axiosInstance.post("darkMode", { userID });
  return response.status;
};
export {
  verifyEmailAndSendOTP,
  verifyOTP,
  resetPassword,
  sendVerificationEmail,
  verifyAccount,
  setDarkModePreference,
};
