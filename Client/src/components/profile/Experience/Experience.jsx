/** @format */

import ExperienceCard from "./ExperienceCard";

function Experience({ userDetails }) {
  const experiences = userDetails.experiences;
  experiences?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
      <header className="mb-2 text-xl font-semibold">Experience</header>

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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Experience;
