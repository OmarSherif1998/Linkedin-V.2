import AddIcon from '@mui/icons-material/Add';
import useScreenSize from '../../../hooks/useScreenSize';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useUser from '../../../hooks/useUser';
import { followCompany } from '../../../api/companyAPI';

function InteractionsButtons({ navigator, companyID }) {
  const { _id } = useUser();
  const { isMobile } = useScreenSize();
  const { darkMode } = useThemeClasses();

  const handleFollow = async () => {
    const response = followCompany(_id, companyID);
    try {
    } catch (error) {}
  };
  const buttonArr = [
    {
      text: 'Follow',
      icon: <AddIcon className='text-sm' />,
      onClick: handleFollow,
      style: `bg-blue-300 text-gray-900  py-1 hover:bg-blue-500`,
    },
    {
      text: 'View page',
      icon: null,
      onClick: navigator,
      style: `border border-gray-400 ${isMobile ? 'py-2' : 'py-1'}   ${darkMode ? 'hover:text-white hover:border-white text-gray-300' : 'hover:text-black hover:border-black text-gray-600'} `,
    },
  ];

  return (
    <div
      className={`flex items-center ${isMobile ? 'justify-center' : ''} mt-3 w-full gap-2`}
    >
      {buttonArr.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick || undefined}
          className={`flex items-center justify-center gap-1 whitespace-nowrap rounded-full font-semibold ${
            isMobile ? 'w-fit px-3 py-1 text-xs' : 'px-4 py-1'
          } ${btn.style}`}
        >
          {btn.icon}
          {btn.text}
        </button>
      ))}
    </div>
  );
}

export default InteractionsButtons;
