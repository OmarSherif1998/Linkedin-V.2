import useThemeClasses from '../../../hooks/useThemeClasses';

function JobListHeader({ length }) {
  const { textColorClass, borderColor } = useThemeClasses();
  return (
    <div className={`border-b border-r ${borderColor} p-5`}>
      <h1 className={`${textColorClass} text-xl font-semibold`}>
        Top job picks for you
      </h1>
      <p className={`text-xs text-gray-500`}>
        Based on your profile, preferences, and activity like applies, searches,
        and saves
      </p>
      {length && (
        <p className={`text-xs text-gray-500`}>
          {length < 1 ? length + ' result' : length + ' results'}
        </p>
      )}
    </div>
  );
}

export default JobListHeader;
