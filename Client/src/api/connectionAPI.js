/** @format */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/connection",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

const sendConnectionRequest = async (senderID, receiverID) => {
  try {
    const data = { senderID, receiverID };
    // console.log(data);
    const response = await axiosInstance.post("/sendConnectionRequest", data);
    return response;
  } catch (error) {
    console.error(
      "CONNECTION API ERROR: Error sending connection request:",
      error.message,
    );
  }
};
const getConnectionRequests = async (userID) => {
  try {
    const response = await axiosInstance.get("/getConnectionRequests", {
      params: { userID }, // Use query parameters
    });
    return response.data;
  } catch (error) {
    console.error("CONNECTION API ERROR: ", error);
  }
};
const acceptRequest = async (requestID, userID) => {
  try {
    const data = { requestID, userID };
    console.log(data);
    const response = await axiosInstance.post("/acceptRequest", {
      data,
    });
    return response;
  } catch (error) {
    console.error("CONNECTION API ERROR: ", error);
  }
};

const rejectRequest = async (requestID) => {
  try {
    const response = await axiosInstance.post("/rejectRequest", {
      requestID,
    });
    return response;
  } catch (error) {
    console.error("CONNECTION API ERROR: ", error);
  }
};
const getUserConnections = async (userID) => {
  try {
    //console.log(userID);
    // Send userID as a query parameter
    const response = await axiosInstance.get(`/connections?userID=${userID}`);
    // console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error("CONNECTION API ERROR: ", error);
  }
};

export {
  sendConnectionRequest,
  getConnectionRequests,
  acceptRequest,
  rejectRequest,
  getUserConnections,
};
