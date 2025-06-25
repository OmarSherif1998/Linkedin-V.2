/** @format */

import ExperienceCard from './ExperienceCard';
import useThemeClasses from '../../../hooks/useThemeClasses';

function Experience({ experiences }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();

  const companyName = experiences[0]?.company?.name;
  const companyImg = experiences[0]?.company?.profilePicture;
  return (
    <div
      className={`p-4 ${componentBGColorClass} border-gray-400 md:rounded-lg md:border md:shadow-xl`}
    >
      <header className={`mb-2 text-xl font-semibold ${textColorClass}`}>
        Experiences
      </header>

      {experiences && (
        <div className='flex flex-col gap-2'>
          {experiences.map((experience, idx) => (
            <ExperienceCard
              key={idx}
              companyId={experience.company?._id}
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
