import useThemeClasses from "../../hooks/useThemeClasses";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LoadingSpinner from "../util/LoadingSpinner";
import JobCard from "./JobCard";
function TopPicks({ showModal, job, isLoading, setTopPickID }) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();

  return (
    <div
      className={`${componentBGColorClass} flex w-full flex-col pt-2 md:rounded-lg md:border`}
    >
      <h1
        className={`flex flex-col p-2 text-xl font-semibold md:p-5 ${textColorClass}`}
      >
        Top job picks you
        <span className="text-xs text-gray-500">
          Based on your profile, preferences, and activity like applies,
          searches, and saves
        </span>
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : job.length > 0 ? (
        <>
          {" "}
          <div
            className={`flex flex-col gap-4 ${componentBGColorClass} min-h-[20vh] p-3 shadow-sm`}
          >
            {job?.map((job, idx) => (
              <JobCard
                key={idx}
                job={job}
                isLoading={isLoading}
                showModal={showModal}
                setTopPickID={setTopPickID}
              />
            ))}
          </div>
          <button
            className={`${textColorClass} flex w-full items-center justify-center gap-1 rounded-b-lg p-3 ${hoverColorClass}`}
          >
            {" "}
            Show all <ArrowRightAltIcon />
          </button>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <p className={`${textColorClass} pb-2`}>No jobs found</p>
        </div>
      )}
    </div>
  );
}

export default TopPicks;
