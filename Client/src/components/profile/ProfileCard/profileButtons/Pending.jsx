import ProfilePendingButton from './reusableButtons/ProfilePendingButton';
import MessageButton from './reusableButtons/MessageButton';
import DottedButton from './reusableButtons/DottedButton';

function Pending({ handlePending }) {
  return (
    <div className='mr-auto mt-2 flex flex-wrap items-center gap-2'>
      <ProfilePendingButton handlePending={handlePending} />
      <MessageButton />
      <DottedButton />
    </div>
  );
}

export default Pending;
