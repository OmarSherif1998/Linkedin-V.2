import useThemeClasses from '../../hooks/useThemeClasses';

function CompanyInfo({ bio, city, location, followers, industry, size }) {
  const { darkMode } = useThemeClasses();
  const listItems = [
    industry,
    `${city}, ${location}`,
    `${followers}M followers`,
    `${size} employees`,
  ];

  return (
    <div>
      <p className='text-[8px] md:text-base'>{bio}</p>

      <ul className='flex gap-1 text-[8px] md:text-sm'>
        {listItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === listItems.length - 1;
          return (
            <li
              key={index}
              className={`relative ${!isFirst ? 'pl-2' : ''} font-semibold text-gray-400 ${
                isFirst
                  ? ''
                  : `before:absolute before:left-0 before:top-1/2 before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:rounded-full ${
                      isLast ? 'before:bg-blue-500' : 'before:bg-gray-500'
                    }`
              }`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CompanyInfo;
