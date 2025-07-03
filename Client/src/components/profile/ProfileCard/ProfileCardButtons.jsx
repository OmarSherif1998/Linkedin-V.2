import PendingButtons from './profileButtons/PendingButtons';
import SelfButtons from './profileButtons/SelfButtons';
import ConnectionButtons from './profileButtons/ConnectionButtons';
import DefualtButtons from './profileButtons/DefualtButtons';

function ProfileCardButtons({ connectionStatus, onConnect }) {
  const isSelf = connectionStatus === 'self';
  const isConnected = connectionStatus === 'accepted';
  const isPending = connectionStatus === 'pending';
  if (isSelf) {
    return <SelfButtons />;
  }

  if (isPending) {
    return <PendingButtons />;
  }

  if (isConnected) {
    return <ConnectionButtons />;
  }

  return <DefualtButtons onConnect={onConnect} />;
}

export default ProfileCardButtons;
