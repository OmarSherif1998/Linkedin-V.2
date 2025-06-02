import { Work, CheckCircle, Schedule } from "@mui/icons-material";
import useThemeClasses from "../../hooks/useThemeClasses";

function MyApplications() {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  const mockApplications = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Amazon",
      location: "Seattle, USA",
      status: "Applied",
      appliedAt: "3 days ago",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Meta",
      location: "Menlo Park, USA",
      status: "Interview",
      appliedAt: "1 week ago",
    },
  ];
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Work className="text-blue-500" />
        <h2 className={`text-lg font-semibold ${textColorClass}`}>
          Applications
        </h2>
      </div>
      <div className="space-y-4">
        {mockApplications.map((job) => (
          <div
            key={job.id}
            className="pb-4 border-b border-gray-200 last:border-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-medium ${textColorClass}`}>{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-xs text-gray-400">Applied {job.appliedAt}</p>
              </div>
              <div className="flex items-center gap-1">
                {job.status === "Applied" ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <Schedule className="text-blue-500" />
                )}
                <span className="text-sm text-gray-500">{job.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
