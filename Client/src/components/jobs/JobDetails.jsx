import React from "react";
import { BookmarkBorder, Bookmark, Share, Flag } from "@mui/icons-material";
import useThemeClasses from "../../hooks/useThemeClasses";

// Temporary mock data for the selected job
const selectedJob = {
  id: 1,
  title: "Senior Software Engineer",
  company: {
    name: "Google",
    logo: "https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg",
    size: "10,000+",
    industry: "Internet",
    website: "https://www.google.com",
  },
  location: {
    city: "Mountain View",
    country: "USA",
    isRemote: false,
  },
  type: "Full-time",
  level: "Senior",
  department: "Engineering",
  description:
    "We are looking for a Senior Software Engineer to join our team...",
  responsibilities: [
    "Design and implement scalable software solutions",
    "Collaborate with cross-functional teams",
    "Mentor junior developers",
    "Participate in code reviews",
  ],
  qualifications: [
    "5+ years of software development experience",
    "Strong knowledge of data structures and algorithms",
    "Experience with cloud platforms",
    "Excellent problem-solving skills",
  ],
  skills: ["JavaScript", "React", "Node.js", "AWS"],
  salaryRange: {
    min: 150000,
    max: 200000,
    currency: "USD",
  },
  postedAt: "2 days ago",
  views: 1234,
  applicants: 89,
};

function JobDetails() {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div
      className={`${componentBGColorClass} ${borderClass} rounded-lg p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img
            src={selectedJob.company.logo}
            alt={selectedJob.company.name}
            className="object-cover w-16 h-16 rounded-lg"
          />
          <div>
            <h2 className={`text-2xl font-semibold ${textColorClass}`}>
              {selectedJob.title}
            </h2>
            <p className={`text-lg ${textColorClass}`}>
              {selectedJob.company.name}
            </p>
            <p className="text-gray-500">
              {selectedJob.location.city}, {selectedJob.location.country}{" "}
              {selectedJob.location.isRemote && "· Remote"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? (
              <Bookmark className="text-blue-500" />
            ) : (
              <BookmarkBorder />
            )}
          </button>
          <button>
            <Share />
          </button>
          <button>
            <Flag />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {selectedJob.type}
        </span>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {selectedJob.level}
        </span>
        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          {selectedJob.department}
        </span>
      </div>

      <div className="mt-6">
        <h3 className={`mb-2 text-lg font-semibold ${textColorClass}`}>
          About the job
        </h3>
        <p className={`${textColorClass}`}>{selectedJob.description}</p>
      </div>

      <div className="mt-6">
        <h3 className={`mb-2 text-lg font-semibold ${textColorClass}`}>
          Responsibilities
        </h3>
        <ul className="list-disc list-inside">
          {selectedJob.responsibilities.map((item, index) => (
            <li key={index} className={`${textColorClass}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className={`mb-2 text-lg font-semibold ${textColorClass}`}>
          Qualifications
        </h3>
        <ul className="list-disc list-inside">
          {selectedJob.qualifications.map((item, index) => (
            <li key={index} className={`${textColorClass}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className={`mb-2 text-lg font-semibold ${textColorClass}`}>
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedJob.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
        <p>{selectedJob.views} views</p>
        <p>{selectedJob.applicants} applicants</p>
        <p>Posted {selectedJob.postedAt}</p>
      </div>

      <button className="w-full py-2 mt-6 text-white bg-blue-600 rounded-full hover:bg-blue-700">
        Apply
      </button>
    </div>
  );
}

export default JobDetails;
