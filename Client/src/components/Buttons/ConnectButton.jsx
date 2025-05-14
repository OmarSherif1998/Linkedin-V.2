/** @format */

import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ConnectButton({ Connection }) {
  return (
    <aside className="ml-auto">
      <button
        onClick={Connection}
        className="group flex cursor-pointer items-center gap-2 px-[0.5rem] font-medium text-blue-500 hover:rounded-xl hover:bg-blue-100 hover:bg-opacity-50 hover:text-postButtonColor"
      >
        <PersonAddIcon className="text-blue-500 group-hover:text-postButtonColor" />
        <span className="group-hover:text-postButtonColor">Connect</span>
      </button>
    </aside>
  );
}

export default ConnectButton;
