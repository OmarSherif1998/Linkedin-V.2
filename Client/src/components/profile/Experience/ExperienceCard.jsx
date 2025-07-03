/** @format */
import React, { useMemo } from 'react';
import companyImage from '../../../images/defaultCompImg.jpeg';
import { calcDates } from '../../../functions/calcDates';
import { formatDates } from '../../../functions/formatDates';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useNavigation from '../../../hooks/useNavigation';

function ExperienceCard({
  companyId,
  jobTitle,
  companyName,
  employmentType,
  startDate,
  endDate,
  location,
  locationType,
  description,
  companyImg,
}) {
  const { textColorClass } = useThemeClasses();
  const timePassed = startDate ? calcDates(startDate) : '';
  const start = useMemo(() => formatDates(startDate), [startDate]);
  const end = useMemo(() => (endDate ? formatDates(endDate) : null), [endDate]);

  const descList = useMemo(() => description.split('\n'), [description]);
  const { NavigateToCompany } = useNavigation();
  return (
    <div className='flex gap-4'>
      <img
        onClick={() => NavigateToCompany(companyId)}
        src={companyImg || companyImage}
        alt=''
        className='mt-5 size-12 cursor-pointer'
      />
      <section className='py-2'>
        <h2 className={`text-lg font-medium ${textColorClass}`}>{jobTitle}</h2>
        <p className={`text-sm ${textColorClass}`}>
          {companyName} · {employmentType}
        </p>
        <section className='flex gap-1 text-sm text-gray-600'>
          <time className=''>{start} </time> -{' '}
          <p className=''>{end ? end : 'Present'}</p>{' '}
          <span className='italic text-gray-600'> · {timePassed}</span>
        </section>
        <div className='text-sm text-gray-600'>
          {location && (
            <span>
              {location} · <span>{locationType}</span>
            </span>
          )}
        </div>
        <section className='pt-2 text-sm text-gray-600'>
          {descList.map((desc, idx) => (
            <p key={idx}>{desc}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default ExperienceCard;
