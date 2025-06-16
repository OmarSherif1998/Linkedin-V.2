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
const getRecommendedJobs = async (jobID) => {
  try {
    const response = await axiosInstance.get("/recommendedJobs", {
      params: { jobID },
    });
    return response.data;
  } catch (error) {
    console.error("ERROR FETCHING RECOMMENDED JOBS:", error);
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
    const response = await axiosInstance.post("/applyForJob", {
      formData,
      userID,
      email,
      jobName,
      jobID,
      companyName,
    });
    return response.data;
  } catch (error) {
    console.error("ERROR APPLYING FOR JOB:", error);
    throw error;
  }
};

export { getTopPicksJobs, getRecommendedJobs, ApplyForJob };
