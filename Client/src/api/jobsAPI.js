import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/jobs`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

const getTopPicksJobs = async (preferences) => {
  try {
    const response = await axiosInstance.get('/topPicks', {
      params: {
        ...preferences,
      },
    });

    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING TOP PICKS JOBS:', error);
  }
};
const getRecommendedJobs = async (jobID) => {
  try {
    const response = await axiosInstance.get('/recommendedJobs', {
      params: { jobID },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING RECOMMENDED JOBS:', error);
    throw error; // Re-throw the error so React Query can handle it
  }
};
const getMobileJob = async (jobID) => {
  try {
    const response = await axiosInstance.get('/mobileJob', {
      params: { jobID },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING RECOMMENDED JOBS:', error);
    throw error; // Re-throw the error so React Query can handle it
  }
};

const ApplyForJob = async (
  formData,
  userID,
  email,
  jobName,
  jobID,
  companyName,
) => {
  try {
    const response = await axiosInstance.post('/applyForJob', {
      formData,
      userID,
      email,
      jobName,
      jobID,
      companyName,
    });
    return response.data;
  } catch (error) {
    console.error('ERROR APPLYING FOR JOB:', error);
    throw error;
  }
};
const getMoreJobs = async ({ pageParam = 1, preferences }) => {
  try {
    const response = await axiosInstance.get('/moreJobs', {
      params: {
        ...preferences,
        page: pageParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING MORE JOBS:', error);
    throw error;
  }
};

const getSimilarJobs = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get('/similarJobs', {
      params: { page: pageParam },
    });
    return response.data;
  } catch (error) {
    console.error('ERROR FETCHING SIMILAR JOBS:', error);
    throw error;
  }
};

export {
  getTopPicksJobs,
  getRecommendedJobs,
  ApplyForJob,
  getMobileJob,
  getMoreJobs,
  getSimilarJobs,
};
