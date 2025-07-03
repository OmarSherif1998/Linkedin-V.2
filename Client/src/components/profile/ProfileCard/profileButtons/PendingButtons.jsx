import useThemeClasses from '../../../../hooks/useThemeClasses';
import SendIcon from '@mui/icons-material/Send';

function PendingButtons() {
  const { hoverColorClass } = useThemeClasses();
  return (
    <div className='mt-2 flex flex-wrap gap-2'>
      <button className='flex h-[2rem] items-center gap-1 rounded-full border border-gray-400 bg-gray-200 px-3 text-gray-700 transition-colors md:px-5'>
        Pending
      </button>
      <button
        className={`${hoverColorClass} flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue px-3 text-LinkedInBlue transition-colors md:px-5`}
      >
        <SendIcon className='-rotate-45 rounded-full bg-LinkedInBlue p-[0.25rem] text-white' />
        <p>Message</p>
      </button>
    </div>
  );
}

export default PendingButtons;
