import baseButtonClasses from '../../../../../staticData/baseButtonClasses';

function ProfileConnectButton({ onConnect, btnText, Icon }) {
  return (
    <button
      onClick={onConnect}
      className={`${baseButtonClasses} w-fit bg-LinkedInBlue text-white hover:bg-blue-800 md:px-5`}
    >
      {Icon}
      <p>{btnText}</p>
    </button>
  );
}

export default ProfileConnectButton;
