import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import { LocalPendingRequests } from '../../functions/LocalPendingRequests.js';
import { calcDates } from '../../functions/calcDates.js';
import { addPendingRequest } from '../../Redux/sllices/connectionSlice.js';
import {
  getPendingRequestList,
  sendConnectionRequest,
} from '../../api/connectionAPI.js';
import queryClient from '../../functions/queryClient.js';
import PublicIcon from '@mui/icons-material/Public';
import useThemeClasses from '../../hooks/useThemeClasses.js';
import PendingButton from '../Buttons/PendingButton.jsx';
import ConnectButton from '../Buttons/ConnectButton.jsx';
import useNavigation from '../../hooks/useNavigation.js';

const PostHeader = ({
  profilePicture,
  username,
  bio,
  createdAt,
  posterUserID,
  connections,
  userID,
}) => {
  const { textColorClass } = useThemeClasses();
  const dispatch = useDispatch();
  const { NavigateToProfile, NavigateToVisitedProfile } = useNavigation();
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ['pendingRequests'],
    queryFn: () => getPendingRequestList(userID),
  });

  const connectionSet = new Set(connections || []);
  const pendingRequestSet = new Set(
    (pendingRequests || []).map((req) =>
      req.sender === userID ? req.receiver : req.sender,
    ),
  );

  const isCurrentUser = posterUserID === userID;
  const isFriendPost = connectionSet.has(posterUserID);
  const hasPendingRequest = pendingRequestSet.has(posterUserID);

  const handleConnection = async () => {
    try {
      const response = await sendConnectionRequest(userID, posterUserID);
      if (response.status === 200) {
        queryClient.invalidateQueries(['pendingRequests']);
        dispatch(addPendingRequest(posterUserID));
        LocalPendingRequests(userID, posterUserID);
      }
    } catch (error) {
      console.error(
        'CLIENT ERROR: Error sending connection request:',
        error.message,
      );
    }
  };
  const routeToProfile = () => {
    isCurrentUser
      ? NavigateToProfile()
      : NavigateToVisitedProfile(posterUserID);
  };

  return (
    <section className='mb-[0.625rem] flex items-center gap-2'>
      <Avatar
        src={profilePicture}
        className='border cursor-pointer'
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

      {!isCurrentUser && !isFriendPost ? (
        hasPendingRequest ? (
          <PendingButton />
        ) : (
          <ConnectButton Connection={handleConnection} />
        )
      ) : null}
    </section>
  );
};

export default PostHeader;
