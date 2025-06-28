/** @format */
import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/search`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

const Search = async (searchParam, _id) => {
  // Ensure searchParam is always a string
  const paramString =
    typeof searchParam === 'string' ? searchParam : String(searchParam);
  try {
    const response = await axiosInstance.get('getSearchResults', {
      params: { searchParam: paramString, exclude: _id },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING SEARCH DATA:', error);
    throw error;
  }
};

export { Search };
