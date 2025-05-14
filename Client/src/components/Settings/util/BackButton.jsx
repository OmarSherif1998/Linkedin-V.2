import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useNavigate } from "react-router-dom";

function BackButton({ activeSection }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between border-b bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-black">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
      </button>

      <p className="text-[1rem] font-semibold">{activeSection}</p>
      <LiveHelpIcon />
    </div>
  );
}

export default BackButton;
