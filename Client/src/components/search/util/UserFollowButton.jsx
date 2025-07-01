import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

function UserFollowButton({ isMobile }) {
  return (
    <div className='self-center'>
      <button
        className={`flex items-center justify-center rounded-full border border-blue-400 px-4 py-1 text-sm text-blue-400 hover:bg-blue-700 hover:bg-opacity-10 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-400`}
        style={{ minWidth: isMobile ? '80px' : '110px' }}
      >
        <PersonAddAlt1Icon className='mr-1 text-sm' fontSize='small' />
        <span className={`${isMobile ? 'sr-only' : 'inline'}`}>Connect</span>
      </button>
    </div>
  );
}

export default UserFollowButton;
