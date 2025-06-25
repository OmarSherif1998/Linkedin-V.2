import useThemeClasses from '../../hooks/useThemeClasses';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';

function CompanyCardButtons() {
  const { textColorClass, hoverColorClass } = useThemeClasses();

  return (
    <div className='mb-2 flex gap-2 font-semibold md:my-0'>
      <div className='flex gap-2'>
        <button className='flex items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-2 py-1 text-xs text-white hover:bg-blue-900 sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2 md:text-base'>
          <PersonAddIcon sx={{ fontSize: { xs: 12, md: 20 } }} />
          <span className='text-[8px] md:text-base'>Follow</span>
        </button>

        <button
          className={`flex items-center gap-1 rounded-full border border-LinkedInBlue px-2 py-1 text-xs text-LinkedInBlue hover:bg-blue-50 sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2 md:text-base ${hoverColorClass}`}
        >
          <SendIcon
            sx={{ fontSize: { xs: 12, md: 20 } }}
            className='-rotate-45 transform'
          />
          <span className='text-[8px] md:text-base'>Message</span>
        </button>
      </div>

      <button
        className={`hidden items-center rounded-full border border-gray-600 px-2 py-1 text-xs text-gray-600 hover:border-2 hover:border-gray-900 sm:flex sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2 md:text-base ${textColorClass} ${hoverColorClass}`}
      >
        More
      </button>
    </div>
  );
}

export default CompanyCardButtons;
