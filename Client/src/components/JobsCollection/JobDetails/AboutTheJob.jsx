import React from 'react';
import useThemeClasses from '../../../hooks/useThemeClasses';

function AboutTheJob({
  name,
  overview,
  bio,
  city,
  country,
  description,
  responsibilities,
  qualifications,
  skills,
}) {
  const { textColorClass, darkMode } = useThemeClasses();

  return (
    <div className={`space-y-6 ${textColorClass}`}>
      <section>
        <h2 className='mb-2 text-xl font-semibold'>About the job</h2>
        <p
          className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm`}
        >
          {name} – {bio}
        </p>
        <p
          className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm`}
        >
          Based in {city}, {country}
        </p>
      </section>

      <section>
        <p
          className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm leading-relaxed`}
        >
          {overview}
        </p>
      </section>

      <section>
        <h2 className='mb-1 text-lg font-semibold'>Description</h2>
        <p
          className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm leading-relaxed`}
        >
          {description}
        </p>
      </section>

      <section>
        <h2 className='mb-1 text-lg font-semibold'>Responsibilities</h2>
        {responsibilities?.map((r, idx) => (
          <p
            key={idx}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm leading-relaxed`}
          >
            - {r}
          </p>
        ))}
      </section>

      <section>
        <h2 className='mb-1 text-lg font-semibold'>Qualifications</h2>

        {qualifications?.map((q, idx) => (
          <p
            key={idx}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm leading-relaxed`}
          >
            - {q}
          </p>
        ))}
      </section>
      <section>
        <h2 className='mb-1 text-lg font-semibold'>Prefferred Skills:</h2>

        {skills?.map((s, idx) => (
          <p
            key={idx}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-400'} text-sm leading-relaxed`}
          >
            - {s}
          </p>
        ))}
      </section>
    </div>
  );
}

export default AboutTheJob;
