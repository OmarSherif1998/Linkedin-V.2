/** @format */

import axios from 'axios';
import { Base_URL } from './baseURL';

/** @format */
const axiosInstance = axios.create({
  baseURL: `${Base_URL}/chat`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});
const fetchChats = async (userID) => {
  // console.log(userID);
  try {
    const response = await axiosInstance.get('/chats', { params: { userID } });
    //	console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING CHATS:', error);
    return [];
  }
};
const getHistoricalMessages = async ({ pageParam, roomId }) => {
  try {
    const response = await axiosInstance.get('/historicalMessages', {
      params: { pageParam, roomId },
    });

    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING HISTORICAL MESSAGES:', error);
  }
};
export { fetchChats, getHistoricalMessages };
