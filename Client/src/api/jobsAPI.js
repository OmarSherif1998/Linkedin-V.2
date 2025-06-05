import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/jobs",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

const getTopPicksJobs = async (preferences) => {
  try {
    console.log(preferences);
    const response = await axiosInstance.get("/topPicks", {
      params: {
        ...preferences,
      },
    });

    return response.data;
  } catch (error) {
    console.error("ERROR FETCHING TOP PICKS JOBS:", error);
  }
};

export { getTopPicksJobs };
