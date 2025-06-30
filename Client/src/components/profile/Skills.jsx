/** @format */

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useThemeClasses from '../../hooks/useThemeClasses';
import useScreenSize from '../../hooks/useScreenSize';

function Skills({ Skills = [], type }) {
  const { componentBGColorClass, hoverColorClass, textColorClass } =
    useThemeClasses();
  const { isMobile } = useScreenSize();

  const buttons = [
    <AddIcon sx={{ fontSize: 20 }} />,
    <EditIcon sx={{ fontSize: 20 }} />,
  ];
  return (
    <div
      className={` ${componentBGColorClass} ${isMobile ? 'rounded-none' : 'rounded-2xl'} border border-gray-200 p-6 shadow-lg`}
    >
      <div
        className={`mb-4 flex items-center justify-between text-xl font-semibold text-gray-800 dark:text-gray-100`}
      >
        <h1 className={`${textColorClass} `}>Skills</h1>
        {type === 'Me' ? (
          <div className='flex gap-2'>
            {buttons.map((btn, idx) => {
              return (
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-500 shadow-sm transition-colors ${hoverColorClass}`}
                  key={idx}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className='flex flex-wrap gap-3 mb-4'>
        {Skills.slice(0, 5).map((skill, index) => (
          <span
            key={index}
            className='inline-block px-4 py-2 text-base font-medium text-blue-800 transition-colors border border-blue-200 rounded-full shadow-sm cursor-pointer bg-blue-50 hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-100 dark:hover:bg-gray-700'
          >
            {skill}
          </span>
        ))}
      </div>
      <div className='flex justify-center mt-2'>
        {Skills.length > 0 && (
          <button className='flex items-center gap-2 px-5 py-2 font-semibold text-white transition-colors bg-gray-900 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Show all {Skills.length} skills
            <ArrowForwardIcon sx={{ fontSize: 22, color: '#fff' }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Skills;
