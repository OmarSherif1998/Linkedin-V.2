/** @format */

import React from 'react';
import ManageSidebar from '../components/MyNetworks/ManageSidebar';
import NetworkFeed from '../components/MyNetworks/NetworkFeed';
import LoggedUserFooter from '../components/util/LoggedUserFooter';

function MyNetwork() {
	return (
		<div className='flex w-full gap-5 px-10 '>
			<div className='w-[30%] flex flex-col gap-5'>
				<ManageSidebar />
				<LoggedUserFooter />
			</div>
			<div className='w-[70%]'>
				<NetworkFeed />
			</div>
		</div>
	);
}

export default MyNetwork;
