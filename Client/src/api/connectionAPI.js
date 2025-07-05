/** @format */

import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/connection`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

const sendConnectionRequest = async (senderID, receiverID) => {
  try {
    const data = { senderID, receiverID };
    const response = await axiosInstance.post('/sendConnectionRequest', data);
    return response;
  } catch (error) {
    console.error(
      'CLIENT ERROR: connectionAPI.js, Error sending connection request:',
      error.message,
    );
  }
};
const cancelConnectionRequest = async (senderID, receiverID) => {
  try {
    const data = { senderID, receiverID };
    // console.log(data);
    const response = await axiosInstance.post('/cancelConnectionRequest', data);
    return response;
  } catch (error) {
    console.error(
      'CLIENT ERROR: connectionAPI.js, Error sending connection request:',
      error.message,
    );
  }
};
const getConnectionRequests = async (userID) => {
  try {
    const response = await axiosInstance.get('/getConnectionRequests', {
      params: { userID }, // Use query parameters
    });

    return response.data;
  } catch (error) {
    console.error('CONNECTION API ERROR: ', error);
  }
};
const getPendingRequestList = async (userID) => {
  try {
    const response = await axiosInstance.get('/getPendingRequestList', {
      params: { userID }, // Use query parameters
    });
    return response.data;
  } catch (error) {
    console.error('CONNECTION API ERROR: ', error);
  }
};
const acceptRequest = async (requestID, userID) => {
  try {
    const data = { requestID, userID };
    // console.log(data);
    const response = await axiosInstance.post('/acceptRequest', {
      data,
    });
    return response;
  } catch (error) {
    console.error('CONNECTION API ERROR: ', error);
  }
};

const rejectRequest = async (requestID) => {
  try {
    const response = await axiosInstance.post('/rejectRequest', {
      requestID,
    });
    return response;
  } catch (error) {
    console.error('CONNECTION API ERROR: ', error);
  }
};
const getUserConnections = async (userID) => {
  try {
    // Send userID as a query parameter
    const response = await axiosInstance.get(`/connections?userID=${userID}`);
    // console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error('CONNECTION API ERROR: ', error);
  }
};

export {
  sendConnectionRequest,
  cancelConnectionRequest,
  getConnectionRequests,
  acceptRequest,
  rejectRequest,
  getUserConnections,
  getPendingRequestList,
};
