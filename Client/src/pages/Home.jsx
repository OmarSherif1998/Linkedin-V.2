/** @format */

import React, { useEffect, useState } from 'react';
import Feed from '../components/Home/Feed';
import Sidebar from '../components/Home/Sidebar';
import Connection from '../components/Home/Connection';
import Chat from './Chat';
import LoggedUserFooter from '../components/util/LoggedUserFooter';
import { initializeSocket } from '../Sockets/Sockets';

function Home() {
	const socket = initializeSocket();
	const [isConnected, setIsConnected] = useState(true);
	const [isConnectedMessage, setIsConnectedMessage] = useState(false);
	const [hasReconnected, setHasReconnected] = useState(false);

	useEffect(() => {
		const handleConnect = () => {
			setIsConnected(true);
			if (hasReconnected) {
				setIsConnectedMessage(true);

				setTimeout(() => {
					setIsConnectedMessage(false);
				}, 2000);
			}
		};

		const handleDisconnect = () => {
			setIsConnected(false);
		};

		socket.on('connect', handleConnect);
		socket.on('disconnect', handleDisconnect);

		// Only set hasReconnected after the first connection
		if (!hasReconnected) {
			setHasReconnected(true);
		}

		return () => {
			socket.off('connect', handleConnect);
			socket.off('disconnect', handleDisconnect);
		};
	}, [hasReconnected]);

	const pageSpcs = {
		width: 'fit',
		title: ' Add to your feed',
	};

	return (
		<div className='flex justify-between w-full px-10'>
			<Sidebar />
			<Feed />
			<div>
				<Connection pageSpecs={pageSpcs} />
				<LoggedUserFooter />
			</div>

			{!isConnected && (
				<div className='fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-red-500 w-fit'>
					Server disconnected. Reconnecting...
				</div>
			)}

			{isConnectedMessage && (
				<div className='fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-green-500 w-fit'>
					Connected
				</div>
			)}

			<div className='fixed bottom-0 right-0 z-50'>
				<Chat />
			</div>
		</div>
	);
}

export default Home;
