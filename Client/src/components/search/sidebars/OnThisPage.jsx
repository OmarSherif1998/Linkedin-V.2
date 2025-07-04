import useThemeClasses from '../../../hooks/useThemeClasses';

function OnThisPage({
  currentSection,
  scrollToSection,
  hasPeople,
  hasMorePeople,
  hasPosts,
  hasJobs,
  hasSchools,
  hasPeopleViewed,
}) {
  const { textColorClass, componentBGColorClass, hoverColorClass } =
    useThemeClasses();

  const tabs = [
    { name: 'University', isTrue: hasSchools },
    { name: 'People', isTrue: hasPeople },
    { name: 'People also viewed', isTrue: hasPeopleViewed },
    { name: 'Posts', isTrue: hasPosts },
    { name: 'Jobs', isTrue: hasJobs },
    { name: 'More people', isTrue: hasMorePeople },
  ];
  return (
    <div className={`${componentBGColorClass} flex h-fit flex-col rounded-lg`}>
      <h1 className={`${textColorClass} p-5 pr-5 text-xl font-semibold`}>
        {' '}
        On this page
      </h1>

      <ul className={`${textColorClass} w-full pb-5`}>
        {tabs.map((data, idx) =>
          data.isTrue ? (
            <li
              onClick={() => scrollToSection(data.name)}
              key={idx}
              className={`cursor-pointer px-5 py-1 font-semibold ${currentSection === data.name ? 'border-l-2 border-green-500' : ''} ${hoverColorClass} `}
            >
              {data.name}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

export default OnThisPage;
