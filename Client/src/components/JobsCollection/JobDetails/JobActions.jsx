import { FaLinkedin } from "react-icons/fa6";
import { RiShareForwardBoxFill } from "react-icons/ri";

function JobActions({ isEasyApply, website }) {
  return (
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-4 py-2 font-semibold bg-blue-400 rounded-full">
        {isEasyApply ? (
          <div className="flex items-center gap-1">
            <FaLinkedin />
            <p> Easy Apply</p>
          </div>
        ) : (
          <div
            onClick={() => window.open(`${website}`, "_blank")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <p>Apply</p>
            <RiShareForwardBoxFill fontSize={"large"} className="mt-1" />
          </div>
        )}
      </button>
      <button className="px-6 py-2 font-semibold text-blue-400 border-2 border-blue-400 rounded-full">
        Save
      </button>
    </div>
  );
}

export default JobActions;
