import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

function PostNav() {
  return (
    <header className="mb-[1rem] flex w-full justify-end border-b-[0.1rem] border-gray-200">
      <button className="text-gray-500 hover:text-black">
        <MoreHorizIcon className="cursor-pointer" />
      </button>
      <button className="text-black">
        <CloseIcon className="cursor-pointer" />
      </button>
    </header>
  );
}

export default PostNav;
