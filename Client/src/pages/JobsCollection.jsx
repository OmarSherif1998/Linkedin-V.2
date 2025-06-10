import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedJobs } from "../api/jobsAPI";
import JobList from "../components/JobsCollection/JobList/JobList";
import JobDetails from "../components/JobsCollection/JobDetails/JobDetails";
import JobsNavBar from "../components/jobs/Navbar/JobsNavBar";

function JobsCollection() {
  const { jobID } = useParams();
  const [activeJob, setActiveJob] = useState(null);
  const [activeJobDetails, setActiveJobDetails] = useState(null);
  const [filters, setFilters] = useState(null);
  const [quickFilter, setQuickFilter] = useState("For You");
  const [search, setSearch] = useState("");

  const { data: recommendedJobs, isLoading } = useQuery({
    queryKey: ["recommendedJobs"],
    queryFn: () => getRecommendedJobs(jobID),
  });
  useEffect(() => {
    setActiveJob(jobID);
    const j = recommendedJobs?.find((job) => job._id === jobID);
    setActiveJobDetails(j);
  }, [recommendedJobs]);

  useEffect(() => {}, [filters]);
  return (
    <div className={`flex flex-col`}>
      <div>
        {" "}
        <JobsNavBar
          quickFilter={quickFilter}
          setQuickFilter={setQuickFilter}
          setFilters={setFilters}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className={`mx-auto flex h-[82vh] w-[80vw] justify-around px-5`}>
        <JobList
          recommendedJobs={recommendedJobs}
          activeJob={activeJob}
          setActiveJob={setActiveJob}
          setActiveJobDetails={setActiveJobDetails}
          isLoading={isLoading}
        />
        <JobDetails activeJobDetails={activeJobDetails} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default JobsCollection;
