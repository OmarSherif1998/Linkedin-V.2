import AddIcon from '@mui/icons-material/Add';
import useScreenSize from '../../../hooks/useScreenSize';
import useThemeClasses from '../../../hooks/useThemeClasses';
import CheckIcon from '@mui/icons-material/Check';
function InteractionsButtons({
  navigator,
  handleFollow,
  isDisabled,
  isFollowing,
}) {
  const { isMobile } = useScreenSize();
  const { darkMode } = useThemeClasses();

  const buttonArr = [
    {
      text: isFollowing ? 'Following' : 'Follow',
      icon: !isFollowing ? <AddIcon className='text-sm' /> : <CheckIcon />,
      onClick: handleFollow,
      style: `bg-blue-300 text-gray-900  py-1 hover:bg-blue-500`,
      disabled: isDisabled,
    },
    {
      text: 'View page',
      icon: null,
      onClick: navigator,
      style: `border border-gray-400 ${isMobile ? 'py-2' : 'py-1'}   ${darkMode ? 'hover:text-white hover:border-white text-gray-300' : 'hover:text-black hover:border-black text-gray-600'} `,
      disabled: false,
    },
  ];

  return (
    <div
      className={`flex items-center ${isMobile ? 'justify-center' : ''} mt-3 w-full gap-2`}
    >
      {buttonArr.map((btn, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            btn.onClick && btn.onClick();
          }}
          className={`flex items-center justify-center gap-1 whitespace-nowrap rounded-full font-semibold ${
            isMobile ? 'w-fit px-3 py-1 text-xs' : 'px-4 py-1'
          } ${btn.style}`}
          disabled={btn.disabled}
        >
          {' '}
          {btn.icon}
          {btn.text}
        </button>
      ))}
    </div>
  );
}

export default InteractionsButtons;
