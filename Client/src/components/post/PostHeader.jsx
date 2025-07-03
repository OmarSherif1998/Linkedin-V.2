import { useState } from 'react';
import { Avatar } from '@mui/material';
import { calcDates } from '../../functions/calcDates.js';
import {
  cancelConnectionRequest,
  sendConnectionRequest,
} from '../../api/connectionAPI.js';
import PublicIcon from '@mui/icons-material/Public';
import useThemeClasses from '../../hooks/useThemeClasses.js';
import PendingButton from '../Buttons/PendingButton.jsx';
import ConnectButton from '../Buttons/ConnectButton.jsx';
import useNavigation from '../../hooks/useNavigation.js';

const PostHeader = ({
  connectionStatus,
  profilePicture,
  username,
  bio,
  createdAt,
  posterUserID,
  userID,
}) => {
  const { textColorClass } = useThemeClasses();
  const { NavigateToProfile, NavigateToVisitedProfile } = useNavigation();
  const [localStatus, setLocalStatus] = useState(connectionStatus);

  const handleSendConnection = async () => {
    try {
      const response = await sendConnectionRequest(userID, posterUserID);
      setLocalStatus('pending'); // update UI immediately
    } catch (error) {
      console.error(
        'CLIENT ERROR: Error sending connection request:',
        error.message,
      );
    }
  };

  const handleCancelConnection = async () => {
    try {
      const response = await cancelConnectionRequest(userID, posterUserID);
      setLocalStatus('none'); // update UI immediately
    } catch (error) {
      console.error(
        'CLIENT ERROR: Error sending connection request:',
        error.message,
      );
    }
  };

  const routeToProfile = () => {
    localStatus === 'self'
      ? NavigateToProfile()
      : NavigateToVisitedProfile(posterUserID);
  };

  return (
    <section className='mb-[0.625rem] flex items-center gap-2'>
      <Avatar
        src={profilePicture}
        className='cursor-pointer border'
        onClick={routeToProfile}
      />
      <div className='flex flex-col justify-start'>
        <h2
          onClick={routeToProfile}
          className={`w-fit cursor-pointer text-[0.9375rem] font-normal ${textColorClass} hover:text-blue-600 hover:underline`}
        >
          {username}
        </h2>
        <p
          onClick={routeToProfile}
          className='cursor-pointer text-[0.65rem] text-gray-500'
        >
          {bio}
        </p>
        <time className='flex items-center gap-1 text-[0.65rem] text-gray-500'>
          {createdAt ? calcDates(createdAt) : null} ago •{' '}
          <PublicIcon style={{ fontSize: '0.9rem' }} />
        </time>
      </div>

      {localStatus === 'none' && (
        <ConnectButton sendConnectionRequest={handleSendConnection} />
      )}
      {localStatus === 'pending' && (
        <PendingButton cancelConnectionRequest={handleCancelConnection} />
      )}
    </section>
  );
};

export default PostHeader;
