import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import useThemeClasses from "../../../hooks/useThemeClasses";
import useNavigation from "../../../hooks/useNavigation";

function BackButton({ activeSection }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();

  const navigate = useNavigate();
  const { NavigateToHome } = useNavigation();

  const onClickFx = () => {
    return activeSection.startsWith("/Settings")
      ? NavigateToHome()
      : navigate(-1);
  };
  return (
    <div
      className={`${componentBGColorClass} ${textColorClass} flex w-full items-center justify-between border-b px-4 py-2 text-lg font-medium`}
    >
      <button onClick={onClickFx}>
        <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
      </button>

      <p className="text-[1rem] font-semibold">{activeSection}</p>
      <LiveHelpIcon />
    </div>
  );
}

export default BackButton;
