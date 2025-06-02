import React from "react";
import { Bookmark } from "@mui/icons-material";
import useThemeClasses from "../../hooks/useThemeClasses";

// Temporary mock data for saved jobs and applications
const mockSavedJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, USA",
    postedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Microsoft",
    location: "Redmond, USA",
    postedAt: "1 week ago",
  },
];

function MyJobs() {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();

  return (
    <div className="space-y-6">
      {/* Saved Jobs Section */}
      <div
        className={`${componentBGColorClass} ${borderClass} rounded-lg p-4 shadow-sm`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="text-blue-500" />
          <h2 className={`text-lg font-semibold ${textColorClass}`}>My Jobs</h2>
        </div>

        <div className="space-y-4">
          {mockSavedJobs.map((job) => (
            <div
              key={job.id}
              className="pb-4 border-b border-gray-200 last:border-0"
            >
              <h3 className={`font-medium ${textColorClass}`}>{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-xs text-gray-400">{job.postedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
