/** @format */

import React from 'react';
import EducationSection from './EducationSection';

function Education({ userDetails }) {
	console.log('🚀 ~ Education ~ userDetails:', userDetails);
	const education = userDetails.education;
	education?.sort(
		(a, b) =>
			new Date(b.educationStartDate) - new Date(a.education.EducationStartDate)
	);

	return (
		<div className='p-4 bg-white border border-gray-400 rounded-lg shadow-xl '>
			<h1 className='mb-2 text-lg font-semibold text-black'>Education</h1>
			{education &&
				education.map((edu, index) => (
					<EducationSection
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
