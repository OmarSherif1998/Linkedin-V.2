import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import useThemeClasses from '../../../../hooks/useThemeClasses';

function DefualtButtons({ onConnect }) {
  const { componentBGColorClass } = useThemeClasses();

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={onConnect}
        className='mt-2 flex h-[2rem] w-fit items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-3 text-white transition-colors hover:bg-blue-900 md:px-5'
      >
        <PersonAddIcon />
        <p>Connect</p>
      </button>
      <button
        className={`mt-2 flex h-[2rem] w-fit items-center gap-1 rounded-full border border-LinkedInBlue ${componentBGColorClass} px-3 text-LinkedInBlue transition-colors hover:bg-blue-900 hover:text-white md:px-5`}
      >
        <SendIcon className='-rotate-45 rounded-full p-[0.25rem]' />
        <p>Message</p>
      </button>
      <button className='h-[2rem] w-fit rounded-full border border-LinkedInBlue px-4 text-LinkedInBlue transition-colors hover:bg-gray-100 sm:px-5'>
        More
      </button>
    </div>
  );
}

export default DefualtButtons;
