import useThemeClasses from '../../../hooks/useThemeClasses';

function OnThisPage({
  hasPeople,
  hasMorePeople,
  hasPosts,
  hasJobs,
  hasSchools,
  hasCompany,
}) {
  const { textColorClass, componentBGColorClass, hoverColorClass } =
    useThemeClasses();
  const tabs = [
    { name: 'Company', isTrue: hasCompany },
    { name: 'People', isTrue: hasPeople },
    { name: 'Posts', isTrue: hasPosts },
    { name: 'Jobs', isTrue: hasJobs },
    { name: 'More People', isTrue: hasMorePeople },
    { name: 'Schools', isTrue: hasSchools },
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
              key={idx}
              className={`cursor-pointer px-5 py-1 ${hoverColorClass} rounded-b-lg`}
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
