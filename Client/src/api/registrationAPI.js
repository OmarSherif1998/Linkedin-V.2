/** @format */

import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/regi/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const checkEmailExists = async (email) => {
  try {
    // Send the email as an object with a key `email`
    const response = await axiosInstance.post('/checkEmail', { email });
    // console.log("Response from API: ", response); // Log the response data
    return response.data;
  } catch (error) {
    console.error('REGISTRATIONAPI, ERROR CHECKING EMAIL EXISTS:', error);
  }
};
const registerUser = async (userData) => {
  try {
    console.log('called');
    const response = axiosInstance.post('/registerUser', userData);
    // console.log("Response from API: ", response);
    return response.data;
  } catch (error) {
    console.error('REGISTRATIONAPI, ERROR REGISTERING USER:', error);
    return null;
  }
};

export { checkEmailExists, registerUser };
