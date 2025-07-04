/** @format */

import EducationCard from './EducationCard';
import useThemeClasses from '../../../hooks/useThemeClasses';

function Education({ userDetails }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const education = userDetails.education;
  education?.sort(
    (a, b) =>
      new Date(b.educationStartDate) - new Date(a.education.EducationStartDate),
  );

  return (
    <div
      className={`p-4 ${componentBGColorClass} border-gray-400 md:rounded-lg md:border md:shadow-xl`}
    >
      <h1 className={`mb-2 text-lg font-semibold ${textColorClass}`}>
        Education
      </h1>
      {education &&
        education.map((edu, index) => (
          <EducationCard
            key={index}
            universityId={edu.university?._id}
            universityName={edu.university?.name}
            profilePicture={edu.university?.profilePicture}
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
