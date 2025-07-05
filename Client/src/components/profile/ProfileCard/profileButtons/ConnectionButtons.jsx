import MoreButton from './reusableButtons/MoreButton';
import MessageButton from './reusableButtons/MessageButton';

function ConnectionButtons() {
  return (
    <div>
      <div className='mt-2 flex flex-wrap gap-2 sm:gap-3'>
        <MessageButton />
        <MoreButton />
      </div>
    </div>
  );
}

export default ConnectionButtons;
