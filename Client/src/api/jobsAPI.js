import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/jobs",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

const getTopPicksJobs = async (prefernce) => {
  try {
    const response = await axiosInstance.get("/topPicks", {
      params: {
        prefernce,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching top picks jobs:", error);
  }
};

export { getTopPicksJobs };
