import SendIcon from '@mui/icons-material/Send';
import useThemeClasses from '../../../../../hooks/useThemeClasses';
import baseButtonClasses from '../../../../../staticData/baseButtonClasses';

function MessageButton() {
  const { hoverColorClass } = useThemeClasses();
  return (
    <button className={`${hoverColorClass} ${baseButtonClasses}`}>
      <SendIcon className='-rotate-45 rounded-full p-[0.25rem] text-LinkedInBlue' />
      <p>Message</p>
    </button>
  );
}

export default MessageButton;
