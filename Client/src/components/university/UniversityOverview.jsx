import { useState } from 'react';
import useThemeClasses from '../../hooks/useThemeClasses';

function UniversityOverview({ overview }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const [isExpanded, setIsExpanded] = useState(false);
  const overviewText = overview || '';
  const characterLimit = 400;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? overviewText
    : overviewText.substring(0, characterLimit) +
      (overviewText.length > characterLimit ? '...' : '');

  return (
    <div
      className={`flex min-h-[8rem] w-full flex-col gap-4 border-gray-400 ${componentBGColorClass} p-4 md:border lg:rounded-lg lg:shadow-xl`}
    >
      <section>
        <h1 className={`text-sm font-semibold md:text-lg ${textColorClass}`}>
          Overview
        </h1>
        <p className={`${textColorClass} text-xs md:text-sm`}>{displayText}</p>
        {overviewText.length > characterLimit && (
          <button
            onClick={toggleExpansion}
            className='ml-auto mt-2 flex text-gray-500 hover:text-LinkedInBlue hover:underline focus:outline-none'
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </section>
    </div>
  );
}

export default UniversityOverview;
