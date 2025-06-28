import AddIcon from '@mui/icons-material/Add';
import useScreenSize from '../../../hooks/useScreenSize';

function InteractionsButtons({ navigator }) {
  const { isMobile } = useScreenSize();

  const buttonArr = [
    {
      text: 'Follow',
      icon: <AddIcon className='text-sm' />,
      onClick: null,
      style: `bg-blue-300 text-gray-900  py-1 hover:bg-blue-500`,
    },
    {
      text: 'View page',
      icon: null,
      onClick: navigator,
      style: `border border-gray-400 py-2 text-gray-300 hover:border-white hover:text-white`,
    },
  ];

  return (
    <div className='mt-3 flex w-full items-center justify-center gap-2'>
      {buttonArr.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick || undefined}
          className={`flex items-center justify-center gap-1 rounded-full font-semibold ${
            isMobile
              ? 'h-fit w-[45%] text-xs ' + (idx === 0 ? 'px-7' : 'px-2')
              : 'px-4'
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
