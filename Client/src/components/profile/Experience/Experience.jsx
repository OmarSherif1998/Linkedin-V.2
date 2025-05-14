/** @format */

import ExperienceCard from "./ExperienceCard";
import useThemeClasses from "../../../hooks/useThemeClasses";

function Experience({ userDetails }) {
  const { componentBGColorClass, borderClass, textColorClass } =
    useThemeClasses();
  const experiences = userDetails.experiences;
  experiences?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <div
      className={`p-4 ${componentBGColorClass} ${borderClass} rounded-md shadow-sm`}
    >
      <header className={`mb-2 text-xl font-semibold ${textColorClass}`}>
        Experience
      </header>

      {experiences && (
        <div className="flex flex-col gap-2">
          {experiences.map((experience, idx) => (
            <ExperienceCard
              key={idx}
              jobTitle={experience.jobTitle}
              companyName={experience.companyName}
              employmentType={experience.employmentType}
              startDate={experience.startDate}
              endDate={experience.endDate}
              location={experience.location}
              locationType={experience.locationType}
              description={experience.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Experience;
