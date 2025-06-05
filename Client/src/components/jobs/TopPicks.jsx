import { useQuery } from "@tanstack/react-query";
import { getTopPicksJobs } from "../../api/jobsAPI";
import useThemeClasses from "../../hooks/useThemeClasses";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LoadingSpinner from "../util/LoadingSpinner";
import JobCard from "./JobCard";
function TopPicks({ preferences }) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();

  console.log(preferences);
  const { data: JobsData = [], isLoading } = useQuery({
    queryKey: ["jobs", preferences],
    queryFn: () => getTopPicksJobs(preferences),
    enabled: !!preferences,
  });

  return (
    <div className={`${componentBGColorClass} flex flex-col rounded-lg`}>
      <h1 className={`flex flex-col p-5 lg:text-xl ${textColorClass}`}>
        Top job picks you
        <span className="text-xs text-gray-500">
          Based on your profile, preferences, and activity like applies,
          searches, and saves
        </span>
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`flex flex-col gap-4 ${componentBGColorClass} min-h-[20vh] p-3 shadow-sm`}
        >
          {JobsData?.map((job, idx) => (
            <JobCard key={idx} job={job} isLoading={isLoading} />
          ))}
        </div>
      )}

      <button
        className={`${textColorClass} flex w-full items-center justify-center gap-1 rounded-b-lg p-3 ${hoverColorClass}`}
      >
        {" "}
        Show all <ArrowRightAltIcon />
      </button>
    </div>
  );
}

export default TopPicks;
