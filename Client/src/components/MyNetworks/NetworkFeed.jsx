/** @format */

import { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import PremiumAd from './NetworkFeed/PremiumAd';
import PeopleYouMayKnow from './NetworkFeed/PeopleYouMayKnow';
import PendingConnections from './NetworkFeed/PendingConnections.jsx/PendingConnections';
import Nav from './NetworkFeed/Nav';
import LoadingSpinner from '../util/LoadingSpinner';

function NetworkFeed({ queryPendingRequests, isLoading }) {
  const { _id } = useUser();
  const [pendingRequests, setPendingRequests] = useState([]);
  console.log(queryPendingRequests);
  useEffect(() => {
    setPendingRequests(queryPendingRequests);
  }, []);

  if (isLoading || !_id) return <LoadingSpinner />;
  return (
    <div className='flex min-h-screen w-full flex-col md:mt-5 md:gap-5 md:py-6'>
      <Nav />
      <div className='hidden md:block'>
        <PremiumAd />
      </div>
      <PendingConnections
        pendingRequests={pendingRequests}
        setPendingRequests={setPendingRequests}
        isLoading={isLoading}
      />
      <PeopleYouMayKnow pendingRequests={pendingRequests} />
    </div>
  );
}

export default NetworkFeed;
