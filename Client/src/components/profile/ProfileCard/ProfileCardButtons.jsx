/** @format */
import { useQueryClient } from '@tanstack/react-query';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useThemeClasses from '../../../hooks/useThemeClasses';

function ProfileCardButtons({ type, user, currentUser }) {
  const { hoverColorClass } = useThemeClasses();
  const queryClient = useQueryClient();
  const cachedRequests = queryClient.getQueryData([
    'pendingRequests',
    user._id,
  ]);
  const pendingRequest = cachedRequests?.find(
    (req) => req.sender._id === currentUser._id,
  );
  const alreadyConnected = user?.connections.includes(currentUser._id);

  return alreadyConnected || user._id === currentUser._id ? (
    <div className='mt-2 flex flex-wrap gap-2 sm:gap-3'>
      <button className='h-[2rem] w-fit rounded-full bg-LinkedInBlue px-4 text-white transition-colors hover:bg-blue-900 sm:px-5'>
        Open To
      </button>
      <button className='h-[2rem] w-fit rounded-full border border-LinkedInBlue px-4 text-LinkedInBlue transition-colors hover:bg-gray-100 sm:px-5'>
        Add section
      </button>
    </div>
  ) : (
    <>
      {pendingRequest ? (
        <div className='mt-2 flex flex-wrap gap-2'>
          <button className='flex h-[2rem] items-center gap-1 rounded-full border border-gray-400 bg-gray-200 px-3 text-gray-700 transition-colors md:px-5'>
            Pending
          </button>
          <button
            className={`${hoverColorClass} flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue px-3 text-LinkedInBlue transition-colors md:px-5`}
          >
            <SendIcon className='-rotate-45 transform' />
            <p>Message</p>
          </button>
        </div>
      ) : (
        <button className='mt-2 flex h-[2rem] w-fit items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-3 text-white transition-colors hover:bg-blue-900 md:px-5'>
          <PersonAddIcon />
          <p>Connect</p>
        </button>
      )}
    </>
  );
}

export default ProfileCardButtons;
