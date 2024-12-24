/** @format */

import Experience from './ExperienceForm/Experience';

function Experiences({ userDetails }) {
	console.log('🚀 ~ Experiences ~ userDetails:', userDetails);
	const experiences = userDetails.experiences;
	experiences?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

	return (
		<div className='p-4 bg-white border border-gray-300 rounded-md shadow-sm '>
			<header className='mb-2 text-xl font-semibold '>Experience</header>
			<div className='flex flex-col gap-2'>
				{experiences.map((experience, idx) => (
					<Experience
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
		</div>
	);
}

export default Experiences;
