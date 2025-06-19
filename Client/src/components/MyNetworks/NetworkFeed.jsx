/** @format */

import { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import PremiumAd from './NetworkFeed/PremiumAd';
import PeopleYouMayKnow from './NetworkFeed/PeopleYouMayKnow';
import PendingConnections from './NetworkFeed/PendingConnections.jsx/PendingConnections';
import LoadingScreen from '../util/LoadingScreen';
import Nav from './NetworkFeed/Nav';

function NetworkFeed({ queryPendingRequests, isLoading }) {
  const { _id } = useUser();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    setPendingRequests(queryPendingRequests);
  }, [queryPendingRequests]);

  if (isLoading || !_id) return <LoadingScreen />;
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
      <PeopleYouMayKnow />
    </div>
  );
}

export default NetworkFeed;
