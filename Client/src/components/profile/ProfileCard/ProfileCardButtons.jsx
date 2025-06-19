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
    <div className='flex gap-[0.5rem]'>
      <button className='h-[2rem] w-fit rounded-full bg-LinkedInBlue px-5 text-white hover:bg-blue-900'>
        Open To
      </button>
      <button className='h-[2rem] w-fit rounded-full border border-LinkedInBlue px-5 text-LinkedInBlue hover:bg-gray-100'>
        Add section
      </button>
    </div>
  ) : (
    <>
      {pendingRequest ? (
        <div className='flex gap-2'>
          <button className='flex h-[2rem] items-center gap-1 rounded-full border border-gray-400 bg-gray-200 px-3 text-gray-700 md:px-5'>
            Pending
          </button>
          <button
            className={`${hoverColorClass} flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue px-3 text-LinkedInBlue md:px-5`}
          >
            <SendIcon className='-rotate-45 transform' />
            <p>Message</p>
          </button>
        </div>
      ) : (
        <button className='flex h-[2rem] w-fit items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-3 text-white hover:bg-blue-900 md:px-5'>
          <PersonAddIcon />
          <p>Connect</p>
        </button>
      )}
    </>
  );
}

export default ProfileCardButtons;
