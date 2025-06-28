import useScreenSize from '../../../hooks/useScreenSize';
import useThemeClasses from '../../../hooks/useThemeClasses';

function SearchFilter({ filters, justify, border }) {
  const { textColorClass, componentBGColorClass, borderColor } =
    useThemeClasses();
  const { isMobile } = useScreenSize();
  return (
    <div
      className={`${componentBGColorClass} ${border} ${borderColor} ${isMobile ? 'overflow-visible' : 'overflow-hidden'} p-3`}
    >
      <ul className={`flex ${justify} gap-2`}>
        {filters.map((filter, idx) => {
          return (
            <li
              key={idx}
              className={`flex cursor-pointer items-center gap-1 rounded-2xl border px-3 py-1 font-semibold text-gray-300 hover:${textColorClass} hover:bg-green-600`}
            >
              {filter.component} {filter.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchFilter;
