import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import DottedButton from '../profile/ProfileCard/profileButtons/reusableButtons/DottedButton';
import ProfileConnectButton from '../profile/ProfileCard/profileButtons/reusableButtons/ProfileConnectButton';
function ProfileCardButtons({
  isFollowing,
  onFollow,
  buttonText,
  Icon,
  onClick,
}) {
  return (
    <div className='mb-2 flex gap-2 font-semibold md:my-0'>
      <div className='flex gap-2'>
        <ProfileConnectButton
          Icon={
            isFollowing ? (
              <CheckIcon sx={{ fontSize: { xs: 12, md: 20 } }} />
            ) : (
              <PersonAddIcon sx={{ fontSize: { xs: 12, md: 20 } }} />
            )
          }
          btnText={isFollowing ? 'Following' : 'Follow'}
          onConnect={onFollow}
        />

        <button
          className={`md:text-base' flex items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-2 py-1 text-xs text-white hover:bg-blue-900 sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2`}
          onClick={onClick && onClick}
        >
          <span className='flex items-center gap-1 text-[8px] md:text-base'>
            {buttonText} {Icon}
          </span>
        </button>
      </div>

      <DottedButton />
    </div>
  );
}

export default ProfileCardButtons;
