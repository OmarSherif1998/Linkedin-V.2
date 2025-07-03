/** @format */

import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ConnectButton({ sendConnectionRequest }) {
  return (
    <aside className='ml-auto'>
      <button
        onClick={sendConnectionRequest}
        className='group flex cursor-pointer items-center gap-2 px-[0.5rem] py-2 font-medium text-blue-500 hover:rounded-full hover:bg-blue-100 hover:bg-opacity-50 hover:text-postButtonColor'
      >
        <PersonAddIcon
          fontSize='sm'
          className='text-blue-500 group-hover:text-postButtonColor'
        />
        <span className='text-sm group-hover:text-postButtonColor'>
          Connect
        </span>
      </button>
    </aside>
  );
}

export default ConnectButton;
