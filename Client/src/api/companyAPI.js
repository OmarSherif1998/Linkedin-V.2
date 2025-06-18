import axios from "axios";
import { PROD_BASE_URL } from "./baseURL";

const axiosInstance = axios.create({
  baseURL: `${PROD_BASE_URL}/company/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});
const fetchCompanyData = async (companyID) => {
  try {
    const response = await axiosInstance.get("/companyData", {
      params: { companyID },
    });
    return response.data;
  } catch (e) {
    console.error("ERROR FETCHING COMPANY DATA:", e);
    throw e;
  }
};

const fetchSuggestedCompanies = async () => {
  const res = await axiosInstance.post("/suggestedCompanies");

  return res.data;
};

const getStockPrice = async (symbol) => {
  console.log("ticker", symbol);
  try {
    const response = await axiosInstance.get("/getStockPrice", {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error("COMPANYAPI, ERROR FETCHING STOCK PRICE:", error);
    return null;
  }
};

export { fetchSuggestedCompanies, fetchCompanyData, getStockPrice };
