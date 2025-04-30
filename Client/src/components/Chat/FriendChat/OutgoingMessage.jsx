/** @format */
import { formatTimeToHHMM } from "../../../functions/formatTimeToHHMM";

function OutgoingMessage({
  data,
  profilePicture,
  Name,
  createdAt,
  content,
  status = "delivered", // 'sent' | 'delivered' | 'read'
}) {
  const time = formatTimeToHHMM(createdAt);
  return (
    <div className="flex items-center gap-1 mb-1 ml-auto">
      <div className="flex flex-col px-3 py-1 bg-blue-400 shadow-sm rounded-2xl">
        <p className="flex ml-auto text-sm text-gray-900">{content}</p>

        <section className="flex items-center text-xs whitespace-nowrap">
          <span className="text-[10px] text-gray-500">{time}</span>
          <span className="flex items-center ml-1">
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
        className="object-cover rounded-full size-5"
      />
    </div>
  );
}

export default OutgoingMessage;
