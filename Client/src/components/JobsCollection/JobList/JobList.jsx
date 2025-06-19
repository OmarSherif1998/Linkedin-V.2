import useThemeClasses from '../../../hooks/useThemeClasses';
import JobListHeader from './JobListHeader';
import JobCardSkeleton from '../Skeletons/JobCardSkeleton';
import Card from './Card';

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
        <section className='flex w-full flex-col gap-2'>
          {Array.from({ length: 5 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </section>
      ) : (
        <section className='flex w-full flex-col gap-2 overflow-auto'>
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
