import useThemeClasses from '../../hooks/useThemeClasses';
import img from '../../images/noSearchResults.png';
function NoSearchResults() {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} ${textColorClass} flex flex-col items-center justify-center rounded-lg p-32`}
    >
      <img src={img} className='size-48' alt='' />
      <h2 className='text-xl font-semibold'>No results found</h2>
      <p className='text-sm text-gray-500'>
        Try shortening or rephrasing your search.
      </p>
    </div>
  );
}

export default NoSearchResults;
