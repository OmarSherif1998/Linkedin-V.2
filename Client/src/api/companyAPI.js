import axios from 'axios';
import { Base_URL } from './baseURL';
const axiosInstance = axios.create({
  baseURL: `${Base_URL}/company/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});
const fetchCompanyData = async (companyID, token) => {
  try {
    const response = await axiosInstance.get('/companyData', {
      params: { companyID },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.error('ERROR FETCHING COMPANY DATA:', e);
    throw e;
  }
};
const fetchCompaniesData = async () => {
  try {
    const response = await axiosInstance.get('/companiesData');
    return response.data;
  } catch (e) {
    console.error('ERROR FETCHING COMPANY DATA:', e);
    throw e;
  }
};

const fetchSuggestedCompanies = async (limit, exclude, token) => {
  const res = await axiosInstance.post(
    '/suggestedCompanies',
    { limit, exclude }, // POST body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

const followCompany = async (userID, companyID) => {
  try {
    const response = await axiosInstance.post('/followCompany', {
      userID,
      companyID,
    });
    const { data, status } = response;
    return { data, status };
  } catch (error) {
    console.error('ERROR FOLLOWING COMPANY:', error);
    throw error;
  }
};
const unfollowCompany = async (userID, companyID) => {
  try {
    const response = await axiosInstance.post('/unfollowCompany', {
      userID,
      companyID,
    });
    const { data, status } = response;
    return { data, status };
  } catch (error) {
    console.error('ERROR UNFOLLOWING COMPANY:', error);
    throw error;
  }
};
const getStockPrice = async (symbol) => {
  try {
    const response = await axiosInstance.get('/getStockPrice', {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error('COMPANYAPI, ERROR FETCHING STOCK PRICE:', error);
    return null;
  }
};

export {
  fetchSuggestedCompanies,
  fetchCompanyData,
  fetchCompaniesData,
  followCompany,
  unfollowCompany,
  getStockPrice,
};
