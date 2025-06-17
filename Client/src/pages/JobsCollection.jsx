import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedJobs } from "../api/jobsAPI";
import JobList from "../components/JobsCollection/JobList/JobList";
import JobDetails from "../components/JobsCollection/JobDetails/JobDetails";
import JobsNavBar from "../components/jobs/Navbar/JobsNavBar";
import EasyApplyModal from "../components/JobsCollection/EasyApplyModal/EasyApplyModal";
import useUser from "../hooks/useUser";
import useDebounce from "../hooks/useDebounce";

function JobsCollection() {
  const { _id: userID } = useUser();
  const { jobID } = useParams();
  const [activeJob, setActiveJob] = useState(null);
  const [activeJobDetails, setActiveJobDetails] = useState(null);
  const [filters, setFilters] = useState(null);
  const [quickFilter, setQuickFilter] = useState("For You");
  const [search, setSearch] = useState("");
  const [isEasyApplyModal, setIsEasyModal] = useState(false);

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

  const hasApplied = activeJobDetails?.applicants?.find(
    (applicant) => applicant._id === userID,
  );

  const debouncedSearch = useDebounce(search, 300);

  const filterJobs = (jobs) => {
    if (!debouncedSearch || !jobs) return jobs;
    const searchTerm = debouncedSearch.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.name.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm)),
    );
  };

  const filteredJobs = filterJobs(recommendedJobs);

  return (
    <div className={`relative flex flex-col`}>
      <div>
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
          recommendedJobs={filteredJobs}
          activeJob={activeJob}
          setActiveJob={setActiveJob}
          setActiveJobDetails={setActiveJobDetails}
          isLoading={isLoading}
        />
        <JobDetails
          activeJobDetails={activeJobDetails}
          isLoading={isLoading}
          openEasyApplyModal={() => setIsEasyModal(true)}
          hasApplied={hasApplied}
        />
      </div>
      {isEasyApplyModal ? (
        <EasyApplyModal
          onClose={() => setIsEasyModal(false)}
          jobName={activeJobDetails?.title}
          jobID={activeJobDetails?._id}
          companyName={activeJobDetails?.company?.name}
        />
      ) : null}
    </div>
  );
}

export default JobsCollection;
