import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/university/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});
const fetchUniversityData = async (universityID) => {
  try {
    const response = await axiosInstance.get('/universityData', {
      params: { universityID },
    });
    return response.data;
  } catch (e) {
    console.error('ERROR FETCHING UNIVERSITY DATA:', e);
    throw e;
  }
};
const fetchUniversitiesData = async () => {
  try {
    const response = await axiosInstance.get('/universitiesData');
    return response.data;
  } catch (e) {
    console.error('ERROR FETCHING UNIVERSITY DATA:', e);
    throw e;
  }
};

const fetchSuggestedUniversities = async () => {
  const res = await axiosInstance.post('/suggestedUniversities');

  return res.data;
};

export {
  fetchSuggestedUniversities,
  fetchUniversityData,
  fetchUniversitiesData,
};
