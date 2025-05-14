/** @format */

import React, { useEffect, useState } from "react";
import { acceptRequest, rejectRequest } from "../../../../api/connectionAPI";
import useThemeClasses from "../../../../hooks/useThemeClasses";
import PendingRequestCard from "./PendingRequestCard";

function PendingConnections({ PR }) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setPendingRequests(PR); // Set the passed prop to state
    // console.log(PR); // Log the passed prop for debugging
  }, [PR]);

  const handleAccept = async (_id, userID) => {
    try {
      const response = await acceptRequest(_id, userID);
      setIsLoading(true); //
      if (response.status === 200) {
        // Update the pending requests state and remove the accepted request
        setPendingRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== _id),
        );
        setIsLoading(false); //
      }
    } catch (error) {
      console.error("ERROR PROCESSING THE ACCEPT REQUEST", error);
    }
  };
  const handleReject = async (_id, userID) => {
    try {
      const response = await rejectRequest(_id, userID);
      if (response.status === 200) {
        // Update the pending requests state and remove the accepted request
        setPendingRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== _id),
        );
        setIsLoading(false); //
      }
    } catch (error) {
      console.error("ERROR PROCESSING THE REJECT REQUEST", error);
    }
  };

  return (
    <div
      className={`${componentBGColorClass} border p-3 text-sm font-semibold md:rounded-lg md:p-5 md:text-lg md:shadow-lg`}
    >
      {pendingRequests.length === 0 ? (
        <section className="flex items-center justify-between">
          <p className={`${textColorClass} text-xs font-normal md:text-sm`}>
            No pending invitations
          </p>
          <button
            className={`${hoverColorClass} rounded-md p-1 text-xs ${textColorClass} hover:bg-gray-200 md:text-sm`}
          >
            Manage
          </button>
        </section>
      ) : (
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className={`${textColorClass} text-sm md:text-lg`}>
            Pending Requests ({pendingRequests.length}) :
          </h1>
          {pendingRequests.map((request) => (
            <PendingRequestCard
              key={request._id}
              request={request}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingConnections;
