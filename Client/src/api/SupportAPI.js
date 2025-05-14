import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/support",
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

const setDarkMode = async () => {
  const response = await axiosInstance.post("darkMode");
  return response.status;
};
export {
  verifyEmailAndSendOTP,
  verifyOTP,
  resetPassword,
  sendVerificationEmail,
  verifyAccount,
};
