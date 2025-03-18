/** @format */

import EducationCard from "./EducationCard";

function Education({ userDetails }) {
  const education = userDetails.education;
  education?.sort(
    (a, b) =>
      new Date(b.educationStartDate) - new Date(a.education.EducationStartDate),
  );

  return (
    <div className="rounded-lg border border-gray-400 bg-white p-4 shadow-xl">
      <h1 className="mb-2 text-lg font-semibold text-black">Education</h1>
      {education &&
        education.map((edu, index) => (
          <EducationCard
            key={index}
            institutionName={edu.institutionName}
            degree={edu.degree}
            grade={edu.grade}
            major={edu.major}
            educationStartDate={edu.educationStartDate}
            educationEndDate={edu.educationEndDate}
            description={edu.educationDescription}
            activities={edu.activities}
          />
        ))}
    </div>
  );
}

export default Education;
