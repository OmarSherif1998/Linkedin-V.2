import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/company/",
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
    console.error("Error fetching company data:", e);
    throw e;
  }
};

const fetchSuggestedCompanies = async ({ pageParam = 1, exclude, limit }) => {
  const Params = {
    page: pageParam,
    exclude,
    limit,
  };

  const res = await axiosInstance.post("/suggestedCompanies", Params);

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
    console.error("Error fetching stock price:", error);
    return null;
  }
};

export { fetchSuggestedCompanies, fetchCompanyData, getStockPrice };
