/** @format */

import ExperienceCard from './ExperienceCard';
import useThemeClasses from '../../../hooks/useThemeClasses';

function Experience({ experiences }) {
  const { componentBGColorClass, borderClass, textColorClass } =
    useThemeClasses();

  const companyName = experiences[0]?.company?.name;
  const companyImg = experiences[0]?.company?.profilePicture;
  return (
    <div
      className={`p-4 ${componentBGColorClass} ${borderClass} rounded-md shadow-sm`}
    >
      <header className={`mb-2 text-xl font-semibold ${textColorClass}`}>
        Experiences
      </header>

      {experiences && (
        <div className='flex flex-col gap-2'>
          {experiences.map((experience, idx) => (
            <ExperienceCard
              key={idx}
              jobTitle={experience.jobTitle}
              companyName={companyName}
              companyImg={companyImg}
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
