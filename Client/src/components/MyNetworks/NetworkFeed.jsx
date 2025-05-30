/** @format */

import React, { useEffect, useState } from "react";
import Nav from "./NetworkFeed/Nav";
import PremiumAd from "./NetworkFeed/PremiumAd";
import PeopleYouMayKnow from "./NetworkFeed/PeopleYouMayKnow";
import PendingConnections from "./NetworkFeed/PendingConnections.jsx/PendingConnections";
import { getConnectionRequests } from "../../api/connectionAPI";

import useUser from "../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../util/LoadingScreen";
function NetworkFeed() {
  const { _id } = useUser();
  const [pendingRequests, setPendingRequests] = useState([]);
  const { data: requests, isloading } = useQuery({
    queryKey: ["pendingRequests", _id],
    queryFn: () => getConnectionRequests(_id),
    enabled: !!_id, // Only run the query if _id is available
  });
  useEffect(() => {
    setPendingRequests(requests);
  }, [requests]);

  if (isloading || !_id) return <LoadingScreen />;
  return (
    <div className="flex min-h-screen w-full flex-col md:mt-5 md:gap-5 md:py-6">
      <Nav />
      <div className="hidden md:block">
        <PremiumAd />
      </div>
      <PendingConnections
        pendingRequests={pendingRequests}
        setPendingRequests={setPendingRequests}
        isloading={isloading}
      />
      <PeopleYouMayKnow />
    </div>
  );
}

export default NetworkFeed;
