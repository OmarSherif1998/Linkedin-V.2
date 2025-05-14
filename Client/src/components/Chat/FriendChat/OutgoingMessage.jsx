/** @format */
import { formatTimeToHHMM } from "../../../functions/formatTimeToHHMM";

function OutgoingMessage({
  profilePicture,
  Name,
  createdAt,
  content,
  status = "read", // 'sent' | 'delivered' | 'read'
}) {
  const time = formatTimeToHHMM(createdAt);
  return (
    <div className="mb-1 ml-auto flex items-center gap-1">
      <div className="flex flex-col rounded-2xl bg-blue-200 px-3 py-1 shadow-sm">
        <p className="ml-auto flex text-sm text-gray-900">{content}</p>

        <section className="flex items-center whitespace-nowrap text-xs">
          <span className="text-[10px] text-gray-500">{time}</span>
          <span className="ml-1 flex items-center">
            {status === "delivered" && (
              <span className="text-[10px] text-gray-500">✓✓</span>
            )}
            {status === "read" && (
              <span className="text-[10px] text-blue-500">✓✓</span>
            )}
            {status === "sent" && (
              <span className="text-[10px] text-gray-500">✓</span>
            )}
          </span>
        </section>
      </div>

      <img
        src={profilePicture}
        alt={Name}
        className="size-5 rounded-full object-cover"
      />
    </div>
  );
}

export default OutgoingMessage;
