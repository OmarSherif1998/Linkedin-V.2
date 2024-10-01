/** @format */

import React, { useEffect, useState } from 'react';
import Nav from './NetworkFeed/Nav';
import PremiumAd from './NetworkFeed/PremiumAd';
import PeopleYouMayKnow from './NetworkFeed/PeopleYouMayKnow';
import PendingConnections from './PendingConnections';
import { getConnectionRequests } from '../../api/connection';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
function NetworkFeed() {
	const { _id } = useSelector(selectUser);
	const [pendingRequests, setPendingRequests] = useState([]);

	useEffect(() => {
		const getPendingRequests = async () => {
			try {
				const requests = await getConnectionRequests(_id);
				setPendingRequests(requests);
			} catch (error) {
				console.log('ERROR FETCHING PENDING REQUESTS', error);
			}
		};
		getPendingRequests();
	}, [_id]);

	return (
		<div className='flex flex-col gap-5 p-6 mt-5 '>
			<Nav />
			<PremiumAd />
			<PendingConnections PR={pendingRequests} />
			<PeopleYouMayKnow />
		</div>
	);
}

export default NetworkFeed;
