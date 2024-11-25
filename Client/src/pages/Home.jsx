/** @format */

import React from 'react';
import Feed from '../components/Home/Feed';
import Sidebar from '../components/Home/Sidebar';
import Connection from '../components/Home/Connection';
import Chat from './Chat';
import LoggedUserFooter from '../components/util/LoggedUserFooter';

function Home() {
	const pageSpcs = {
		width: 'fit',
		title: ' Add to your feed',
	};

	return (
		<div className='flex justify-center mt-[1.875rem] gap-[1.5rem] w-[100%]'>
			{/* <Sidebar />
			<Feed />
			<div className='w-[20%]'>
				<Connection pageSpecs={pageSpcs} />
				<LoggedUserFooter />
			</div> */}

			<div className='fixed bottom-0 right-0 z-50'>
				<Chat />
			</div>
		</div>
	);
}

export default Home;
