import React from "react";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import useThemeClasses from "../../hooks/useThemeClasses";
import { useQuery } from "@tanstack/react-query";
import { getTopPicksJobs } from "../../api/jobsAPI";

// Temporary mock data based on the Jobs schema

function JobCard({ job }) {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div
      className={`mb-4 ${componentBGColorClass} ${borderClass} rounded-md p-4 shadow-sm`}
    >
      <div className="flex flex-col items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={job.company.profilePicture}
            alt={job.company.name}
            className="object-cover w-12 h-12"
          />

          <div className="flex flex-col gap-1">
            <h3 className={`text-lg font-semibold ${textColorClass}`}>
              {job.title}
            </h3>
            <p className={`text-sm ${textColorClass}`}>{job.company.name}</p>
            <p className="text-sm text-gray-500">
              {job.location.city}, {job.location.country}{" "}
              {job.location.isRemote ? "· Remote" : "· On-site"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {job.type}
        </span>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {job.level}
        </span>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {job.department}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">{job?.postedAt}</p>
      </div>
    </div>
  );
}

function TopPicks() {
  const { data: JobsData = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getTopPicksJobs(),
  });

  console.log(JobsData);
  return (
    <div>
      {JobsData?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default TopPicks;
