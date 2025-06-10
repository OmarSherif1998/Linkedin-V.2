import useThemeClasses from "../../../hooks/useThemeClasses";
import CloseIcon from "@mui/icons-material/Close";
function Card({ job, setActiveJob, activeJob, setActiveJobDetails }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();

  return (
    <div
      className={`flex items-start justify-between border-b p-4 ${activeJob === job._id ? `bg-gray-700` : `${componentBGColorClass}`} ${textColorClass} hover:cursor-pointer`}
      onClick={() => {
        setActiveJob(job._id);
        setActiveJobDetails(job);
      }}
    >
      {/* Left Side: Logo + Info */}
      <div className={`flex gap-3`}>
        <section className="w-12 h-12 shrink-0">
          <img
            src={job.company.profilePicture}
            alt={`${job.company.name} logo`}
            className="object-cover w-full h-full rounded"
          />
        </section>

        <section className="flex flex-col gap-1 text-sm">
          <h1 className="cursor-pointer font-medium text-[#70b5f9] hover:underline">
            {job.title}{" "}
          </h1>
          <p className="text-gray-300">{job.company.name}</p>
          <p className="text-xs text-gray-400">
            {job.location.city}, {job.location.country}{" "}
            {job.isRemote ? "(Remote)" : "(On-site)"}
          </p>
          <p className="mt-1 text-xs text-white">🎓 1 school alum works here</p>
          <p className="mt-1 text-xs text-gray-500">Viewed · Promoted</p>
        </section>
      </div>

      {/* Right Side: Close Icon */}
      <button className="text-gray-500 hover:text-white">
        <CloseIcon />
      </button>
    </div>
  );
}

export default Card;
