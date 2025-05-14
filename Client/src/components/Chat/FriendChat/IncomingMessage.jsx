/** @format */

import { formatTimeToHHMM } from "../../../functions/formatTimeToHHMM";

function IncomingMessage({ profilePicture, Name, createdAt, content }) {
  const time = formatTimeToHHMM(createdAt);

  return (
    <div className="mb-1 mr-auto flex items-center gap-1">
      <img
        src={profilePicture}
        alt={Name}
        className="size-5 rounded-full object-cover"
      />
      <div className="flex flex-col rounded-2xl bg-gray-200 px-3 py-1 shadow-sm">
        <p className="ml-auto flex text-sm text-gray-900">{content}</p>

        <section className="flex items-center whitespace-nowrap text-xs">
          <span className="text-[10px] text-gray-500">{time}</span>
        </section>
      </div>
    </div>
  );
}

export default IncomingMessage;
