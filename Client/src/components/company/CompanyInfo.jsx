import useThemeClasses from '../../hooks/useThemeClasses';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

function CompanyInfo({
  companyName,
  bio,
  city,
  location,
  followers,
  industry,
  size,
}) {
  const { textColorClass } = useThemeClasses();
  const listItems = [
    industry,
    `${city}, ${location}`,
    `${followers}M followers`,
    `${size} employees`,
  ];

  return (
    <div className='flex flex-col justify-between'>
      <section className='flex items-center'>
        <h1
          className={`${textColorClass} truncate text-[20px] font-[400] sm:text-lg xl:text-xl 2xl:text-2xl`}
        >
          {companyName}
        </h1>
        <VerifiedUserOutlinedIcon fontSize='small' />
      </section>
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
