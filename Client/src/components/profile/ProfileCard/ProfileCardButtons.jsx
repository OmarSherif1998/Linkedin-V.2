/** @format */

import SendIcon from "@mui/icons-material/Send";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ProfileCardButtons({ type, user, currentUser }) {
  return (
    <div className="mb-2 flex gap-[0.5rem] font-semibold md:my-0 md:text-lg">
      {type === "Me" ? (
        <div className="flex gap-[0.5rem]">
          <button className="h-[2rem] w-fit rounded-full bg-LinkedInBlue px-5 text-white hover:bg-blue-900">
            Open To
          </button>
          <button className="h-[2rem] w-fit rounded-full border border-LinkedInBlue px-5 text-LinkedInBlue hover:bg-gray-100">
            Add section
          </button>
        </div>
      ) : (
        <div className="flex gap-[0.5rem]">
          {user.connections.includes(currentUser._id) ? null : (
            <button className="flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-3 text-white hover:bg-blue-900 md:px-5">
              <PersonAddIcon />
              <p>Connect</p>
            </button>
          )}
          <button className="flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue px-3 text-LinkedInBlue hover:bg-gray-100 md:px-5">
            <SendIcon className="transform -rotate-45" />
            <p>Message</p>
          </button>
        </div>
      )}

      <button className="h-[2rem] items-center rounded-full border border-gray-600 px-3 text-gray-600 hover:border-2 hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 md:px-5">
        More
      </button>
    </div>
  );
}

export default ProfileCardButtons;
