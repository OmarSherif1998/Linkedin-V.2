/** @format */
import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/search`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  withCredentials: true, // Send cookies with requests
});

const Search = async (searchParam, token) => {
  const paramString =
    typeof searchParam === 'string' ? searchParam : String(searchParam);

  try {
    const response = await axiosInstance.get('getSearchResults', {
      params: { searchParam: paramString },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING SEARCH DATA:', error);
    throw error;
  }
};

export { Search };
