/** @format */

import React, { useMemo } from 'react';
import defaultEducation from '../../../images/defaultEducation.jpg';
import { formatDates } from '../../../functions/formatDates';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useNavigation from '../../../hooks/useNavigation';
function EducationCard({
  universityId,
  universityName,
  degree,
  grade,
  educationStartDate,
  educationEndDate,
  profilePicture,
  description,
  activities,
  major,
}) {
  const { NavigateToUniversity } = useNavigation();
  const { textColorClass } = useThemeClasses();
  const start = useMemo(
    () => formatDates(educationStartDate),
    [educationStartDate],
  );
  const end = useMemo(
    () => (educationEndDate ? formatDates(educationEndDate) : null),
    [educationEndDate],
  );
  return (
    <div className='flex items-center gap-4 p-4'>
      <img
        onClick={() => NavigateToUniversity(universityId)}
        src={profilePicture || defaultEducation}
        alt=''
        className='cursor-pointer size-12'
      />
      <section className='py-2'>
        <h2 className={`text-lg font-medium ${textColorClass}`}>
          {universityName}
        </h2>
        {degree && (
          <p className={`text-sm ${textColorClass}`}>
            {degree} · {major}
          </p>
        )}
        {grade && (
          <div className='text-sm text-gray-600'>
            <span className=''>GPA:{grade}</span>
          </div>
        )}
        <section className='text-sm text-gray-600'>
          <time className=''>{start}</time> -{' '}
          <time className=''>{end}</time>{' '}
        </section>
      </section>
    </div>
  );
}

export default EducationCard;
