import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import useUser from '../../../hooks/useUser';
import useConnectionToggle from '../../../hooks/useConnectionToggle';

function UserConnectButton({ isMobile, connectionStatus, connectionID }) {
  const { _id: userID } = useUser();
  const { isPending, toggleConnection } = useConnectionToggle(
    userID,
    connectionID,
    connectionStatus,
  );
  console.log(isPending);
  return (
    <div className='self-center'>
      <button
        onClick={toggleConnection}
        className={`flex items-center justify-center rounded-full border border-blue-400 px-4 py-1 text-sm text-blue-400 hover:bg-blue-700 hover:bg-opacity-10 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-400`}
        style={{ minWidth: isMobile ? '80px' : '110px' }}
      >
        <PersonAddAlt1Icon className='mr-1 text-sm' fontSize='small' />
        <span className={`${isMobile ? 'sr-only' : 'inline'}`}>
          {isPending ? 'Pending' : 'Connect'}
        </span>
      </button>
    </div>
  );
}

export default UserConnectButton;
