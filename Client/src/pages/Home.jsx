/** @format */

import React from 'react';
import Feed from '../components/Home/Feed';
import Sidebar from '../components/Home/Sidebar';
import Connection from '../components/Home/Connection';

function Home() {
	const pageSpcs = {
		width: 'fit',
		title: ' Add to your feed',
	};
	return (
		<div className='flex justify-center mt-[1.875rem] gap-[1.25rem] w-[100%]'>
			<Sidebar />
			<Feed />
			<Connection pageSpecs={pageSpcs} />
		</div>
	);
}

export default Home;
