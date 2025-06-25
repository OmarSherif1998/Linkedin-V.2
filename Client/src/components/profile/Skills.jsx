/** @format */

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useThemeClasses from '../../hooks/useThemeClasses';

function Skills({ Skills = [], type }) {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={` ${componentBGColorClass} rounded-2xl border border-gray-200 p-6 shadow-lg`}
    >
      <div
        className={`mb-4 flex items-center justify-between text-xl font-bold text-gray-800 dark:text-gray-100`}
      >
        <h1 className='tracking-wide'>Skills</h1>
        {type === 'Me' ? (
          <div className='flex gap-2'>
            <button className='px-3 py-2 transition-colors bg-blue-100 rounded-full shadow-sm hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'>
              <AddIcon sx={{ fontSize: { xs: 10, md: 20 } }} />
            </button>
            <button className='px-3 py-2 transition-colors bg-gray-100 rounded-full shadow-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <EditIcon sx={{ fontSize: { xs: 10, md: 20 } }} />
            </button>
          </div>
        ) : null}
      </div>

      <div className='flex flex-wrap gap-3 mb-4'>
        {Skills.map((skill, index) => (
          <span
            key={index}
            className='inline-block px-4 py-2 text-base font-medium text-blue-800 transition-colors border border-blue-200 rounded-full shadow-sm cursor-pointer bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700'
          >
            {skill}
          </span>
        ))}
      </div>
      <div className='flex justify-center mt-2'>
        {Skills.length > 0 && (
          <button className='flex items-center gap-2 px-5 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Show all {Skills.length} skills
            <ArrowForwardIcon sx={{ fontSize: 22, color: '#fff' }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Skills;
