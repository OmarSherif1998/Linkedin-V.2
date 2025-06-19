import useThemeClasses from '../../../hooks/useThemeClasses';
import CloseIcon from '@mui/icons-material/Close';
function Card({ job, setActiveJob, activeJob, setActiveJobDetails }) {
  const { componentBGColorClass, textColorClass, bgColorClass } =
    useThemeClasses();

  return (
    <div
      className={`flex items-start justify-between border-b p-4 ${activeJob === job._id ? `${bgColorClass}` : `${componentBGColorClass}`} ${textColorClass} hover:cursor-pointer`}
      onClick={() => {
        setActiveJob(job._id);
        setActiveJobDetails(job);
      }}
    >
      {/* Left Side: Logo + Info */}
      <div className={`flex gap-3`}>
        <section className='h-12 w-12 shrink-0'>
          <img
            src={job.company.profilePicture}
            alt={`${job.company.name} logo`}
            className='h-full w-full rounded object-cover'
          />
        </section>

        <section className='flex flex-col gap-1 text-sm'>
          <h1 className='cursor-pointer font-medium text-[#70b5f9] hover:underline'>
            {job.title}{' '}
          </h1>
          <p className='text-gray-300'>{job.company.name}</p>
          <p className='text-xs text-gray-400'>
            {job.location.city}, {job.location.country}{' '}
            {job.isRemote ? '(Remote)' : '(On-site)'}
          </p>
          <p className={`mt-1 text-xs ${textColorClass}`}>
            {' '}
            🎓 1 school alum works here
          </p>
          <p className='mt-1 text-xs text-gray-500'>Viewed · Promoted</p>
        </section>
      </div>

      <button className={`text-gray-500 hover:${textColorClass} `}>
        <CloseIcon className={`text-${textColorClass}`} />
      </button>
    </div>
  );
}

export default Card;
