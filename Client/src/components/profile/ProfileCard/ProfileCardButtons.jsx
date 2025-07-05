import { useState, useEffect } from 'react';
import {
  cancelConnectionRequest,
  sendConnectionRequest,
} from '../../../api/connectionAPI';
import Pending from './profileButtons/Pending';
import SelfButtons from './profileButtons/SelfButtons';
import ConnectionButtons from './profileButtons/ConnectionButtons';
import Default from './profileButtons/Defualt';
import useUser from '../../../hooks/useUser';

function ProfileCardButtons({ connectionStatus, connectionID }) {
  const [localStatus, setLocalStatus] = useState(connectionStatus);
  const { _id: userID } = useUser();

  // Update local state if parent prop changes (e.g., on page reload or route change)
  useEffect(() => {
    setLocalStatus(connectionStatus);
  }, [connectionStatus]);

  const handleConnect = async () => {
    setLocalStatus('pending'); // Simulate connection request
    await sendConnectionRequest(userID, connectionID);
  };

  const handlePending = async () => {
    setLocalStatus('default');
    await cancelConnectionRequest(userID, connectionID);
  };

  if (localStatus === 'self') return <SelfButtons />;
  if (localStatus === 'pending')
    return <Pending handlePending={handlePending} />;
  if (localStatus === 'accepted') return <ConnectionButtons />;

  return <Default onConnect={handleConnect} />;
}

export default ProfileCardButtons;
