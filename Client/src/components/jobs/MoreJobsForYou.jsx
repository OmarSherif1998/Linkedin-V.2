import { useInfiniteQuery } from '@tanstack/react-query';
import { getMoreJobs } from '../../api/jobsAPI';
import LoadingSpinner from '../util/LoadingSpinner';
import JobCard from './JobCard';
import useThemeClasses from '../../hooks/useThemeClasses';
function MoreJobsForYou({ preferences, setTopPickID, showModal }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['moreJobs', preferences],
      queryFn: ({ pageParam = 1 }) => getMoreJobs({ pageParam, preferences }),
      getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
      initialPageParam: 1,
      enabled: true,
    });

  return (
    <div
      className={`dark:bg-dark-card flex w-full flex-col gap-3 rounded-lg ${componentBGColorClass} p-4`}
    >
      <h2 className={`text 2xl font-bold ${textColorClass}`}>
        More Jobs For You
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-col gap-4'>
          {data?.pages?.map((page, pageIndex) =>
            page?.jobs?.map((job, index) => {
              if (!job) return null;
              const isLastElement =
                pageIndex === data.pages.length - 1 &&
                index === page.jobs.length - 1;
              return (
                <div key={job._id}>
                  <JobCard
                    job={job}
                    setTopPickID={setTopPickID}
                    showModal={showModal}
                  />
                </div>
              );
            }),
          )}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300'
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More Jobs'}
            </button>
          )}
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
}

export default MoreJobsForYou;
