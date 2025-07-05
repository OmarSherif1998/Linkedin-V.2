import ProfileConnectButton from './reusableButtons/ProfileConnectButton';
import MessageButton from './reusableButtons/MessageButton';
import MoreButton from './reusableButtons/MoreButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Defualt({ onConnect }) {
  return (
    <div className='mr-auto mt-2 flex items-center gap-2'>
      <ProfileConnectButton
        onConnect={onConnect}
        Icon={<PersonAddIcon />}
        btnText={'Connect'}
      />
      <MessageButton />
      <MoreButton />
    </div>
  );
}

export default Defualt;
