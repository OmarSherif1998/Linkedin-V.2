/** @format */

import React, { useEffect, useState } from "react";
import { acceptRequest, rejectRequest } from "../../api/connectionAPI";

function PendingConnections({ PR }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setPendingRequests(PR); // Set the passed prop to state
    console.log(PR); // Log the passed prop for debugging
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
    <div className="border bg-white p-3 text-sm font-semibold md:rounded-lg md:p-5 md:text-lg md:shadow-lg">
      {pendingRequests.length === 0 ? (
        <section className="flex items-center justify-between">
          <p className="text-xs font-normal md:text-sm">
            No pending invitations
          </p>
          <button className="rounded-md p-1 text-xs text-gray-500 hover:bg-gray-200 md:text-sm">
            Manage
          </button>
        </section>
      ) : (
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className="text-sm md:text-lg">
            Pending Requests ({pendingRequests.length}) :
          </h1>
          {pendingRequests.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between gap-2 rounded-lg bg-white p-3 shadow-lg md:gap-4 md:p-4"
            >
              <section className="flex items-center gap-3 md:gap-5">
                <img
                  src={request.sender.profilePicture}
                  alt={`${request.sender.firstName}'s profile`}
                  className="h-8 w-8 rounded-full md:h-10 md:w-10"
                />
                <div>
                  <p className="text-sm font-semibold md:text-lg">
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
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingConnections;
