/** @format */

import axios from "axios";

/** @format */
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/chat",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});
const fetchChats = async (userID) => {
  //console.log(userID);
  try {
    const response = await axiosInstance.get("/chats", { params: { userID } });
    //	console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};
const getHistoricalMessages = async (currentPage, roomId) => {
  try {
    const response = await axiosInstance.get("/historicalMessages", {
      params: { currentPage, roomId },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching historical messages:", error);
  }
};
export { fetchChats, getHistoricalMessages };
