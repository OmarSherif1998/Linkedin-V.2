import { useInfiniteQuery } from '@tanstack/react-query';
import { getSimilarJobs } from '../../api/jobsAPI';
import LoadingSpinner from '../util/LoadingSpinner';
import JobCard from './JobCard';
import useThemeClasses from '../../hooks/useThemeClasses';

function SimilarJobs({ setTopPickID, showModal }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['similarJobs'],
      queryFn: getSimilarJobs,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  return (
    <div
      className={`dark:bg-dark-card flex w-full flex-col gap-3 rounded-lg ${componentBGColorClass} p-4`}
    >
      <h2 className={`text 2xl font-bold ${textColorClass}`}>Similar Jobs</h2>
      <div className='flex flex-col gap-4'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data.pages.map((page) =>
            page.jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                setTopPickID={setTopPickID}
                showModal={showModal}
              />
            )),
          )
        )}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300'
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
}

export default SimilarJobs;
