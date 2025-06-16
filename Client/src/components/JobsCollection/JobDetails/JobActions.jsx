import { FaLinkedin } from "react-icons/fa6";
import { RiShareForwardBoxFill } from "react-icons/ri";
import timeAgo from "../../../functions/timeAgo";
import { useEffect } from "react";

function JobActions({ isEasyApply, website, openEasyApplyModal, hasApplied }) {
  useEffect(() => {}, [hasApplied]);

  return (
    <div>
      {hasApplied ? (
        <p
          className={`text-sm ${
            Date.now() - new Date(hasApplied.appliedAt).getTime() <
            60 * 60 * 1000
              ? "text-green-600"
              : "text-gray-400"
          }`}
        >
          Applied {timeAgo(hasApplied.appliedAt)}
        </p>
      ) : (
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded-full bg-blue-400 px-4 font-semibold">
            {isEasyApply ? (
              <div
                onClick={openEasyApplyModal}
                className="flex items-center gap-1"
              >
                <FaLinkedin />
                <p> Easy Apply</p>
              </div>
            ) : (
              <div
                onClick={() => window.open(`${website}`, "_blank")}
                className="flex cursor-pointer items-center gap-1"
              >
                <p>Apply</p>
                <RiShareForwardBoxFill fontSize={"large"} className="mt-1" />
              </div>
            )}
          </button>
          <button className="rounded-full border-2 border-blue-400 px-6 py-1 font-semibold text-blue-400">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default JobActions;
