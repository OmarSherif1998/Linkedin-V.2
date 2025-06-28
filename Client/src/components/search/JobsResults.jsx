import { jobFilters } from '../../staticData/SearchData';
import useNavigation from '../../hooks/useNavigation';
import useThemeClasses from '../../hooks/useThemeClasses';
import SearchFilter from './util/SearchFilter';
import useScreenSize from '../../hooks/useScreenSize';

function JobsResults({ jobs }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { NavigateToVisitedProfile } = useNavigation();
  const { isMobile } = useScreenSize();
  return (
    <div
      className={`${componentBGColorClass} ${isMobile ? 'rounded-none' : 'rounded-lg'} p-5`}
    >
      {jobs.length > 0 && (
        <section>
          <h2 className={`mb-4 text-xl font-semibold ${textColorClass}`}>
            Jobs
          </h2>
          <SearchFilter filters={jobFilters} justify={'justify-start'} />
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`flex cursor-pointer items-start justify-between gap-2 border-b px-4 py-3`}
            >
              {/* Left Section */}
              <div className='flex gap-4'>
                <img
                  onClick={() => NavigateToVisitedProfile(job._id)}
                  src={job.company.profilePicture}
                  alt='Profile'
                  className='object-cover border size-14 md:size-16'
                />

                <div
                  className='flex flex-col justify-center'
                  onClick={() => NavigateToVisitedProfile(job.company._id)}
                >
                  <p
                    className={`font-medium ${textColorClass} hover:underline`}
                  >
                    {job.title}
                  </p>
                  <p
                    className={`text-xs text-gray-500 ${textColorClass} hover:underline`}
                  >
                    {job.company.name}
                  </p>

                  <div className='flex items-center gap-1 text-sm text-gray-300'>
                    <p className='text-xs text-gray-400'>
                      {job.location.city}, {job.location.country}
                    </p>
                    <p> ({job.type})</p>
                  </div>

                  <p className='w-full px-20 py-2 mt-1 text-xs text-gray-500'>
                    {/* Replace with dynamic connections if available */}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className='self-center'>
                <button className='px-4 py-1 text-sm text-blue-400 border border-blue-400 rounded-full hover:bg-blue-700 hover:bg-opacity-10 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-400'>
                  Save
                </button>
              </div>
            </div>
          ))}

          <div className='mt-4 text-center'>
            <button className='text-sm font-semibold text-blue-500 hover:underline'>
              See all people results
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default JobsResults;
