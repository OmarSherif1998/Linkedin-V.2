import React from "react";
import useThemeClasses from "../../../../hooks/useThemeClasses";
import { useNavigation } from "../../../../hooks/useNavigation";

function PendingRequestCard({ request, handleAccept, handleReject }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { NavigateToVisitedProfile } = useNavigation();
  return (
    <div
      key={request._id}
      className={`${componentBGColorClass} flex items-center justify-between gap-2 rounded-lg border border-gray-100 p-3 shadow-lg md:gap-4 md:p-4`}
    >
      <section className="flex items-center gap-3 md:gap-5">
        <img
          src={request.sender.profilePicture}
          alt={`${request.sender.firstName}'s profile`}
          className="h-8 w-8 rounded-full md:h-10 md:w-10"
        />
        <div>
          {``}

          <p
            className={`${textColorClass} cursor-pointer text-sm font-semibold hover:underline md:text-lg`}
            onClick={() => NavigateToVisitedProfile(request.sender.id)}
          >
            {request.sender.firstName} {request.sender.lastName}
          </p>
        </div>
      </section>
      <section className="flex items-center gap-1 md:gap-2">
        <button
          onClick={() => handleAccept(request._id, request.sender.id)}
          className="rounded-full border border-LinkedInBlue px-3 text-xs text-LinkedInBlue hover:bg-LinkedInBlue hover:text-white md:px-4 md:text-sm"
        >
          Accept
        </button>
        <button
          onClick={() => handleReject(request._id, request.sender.id)}
          className="rounded-full border border-red-600 px-3 text-xs text-red-600 hover:bg-red-600 hover:text-white md:px-5 md:text-sm"
        >
          Reject
        </button>
      </section>
    </div>
  );
}

export default PendingRequestCard;
