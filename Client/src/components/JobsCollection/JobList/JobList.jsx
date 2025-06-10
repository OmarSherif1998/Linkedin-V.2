import useThemeClasses from "../../../hooks/useThemeClasses";
import LoadingSpinner from "../../util/LoadingSpinner";
import JobListHeader from "./JobListHeader";
import Card from "./Card";
import JobCardSkeleton from "../Skeletons/JobCardSkeleton";

function JobList({
  recommendedJobs,
  activeJob,
  setActiveJob,
  isLoading,
  setActiveJobDetails,
}) {
  const { componentBGColorClass } = useThemeClasses();

  return (
    <div className={`${componentBGColorClass} flex w-full flex-col`}>
      <JobListHeader length={recommendedJobs?.length} />
      {isLoading ? (
        <section className="flex flex-col w-full gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col w-full gap-2 overflow-auto">
          {recommendedJobs.map((job) => (
            <Card
              key={job._id}
              job={job}
              setActiveJob={setActiveJob}
              setActiveJobDetails={setActiveJobDetails}
              activeJob={activeJob}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default JobList;
