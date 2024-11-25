/** @format */

import React, { useEffect, useState } from 'react';
import { initializeSocket } from '../../Sockets/Sockets';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
import roomIdGenearator from '../../functions/roomIdGenearator';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import { getHistoricalMessages } from '../../api/chatAPi';

function FriendChat({
	friendChatInfo = {},
	isFriendChat,
	CloseIcon,
	closeChatTab,
}) {
	const [chatMessages, setChatMessages] = useState([]);
	const socket = initializeSocket();
	const user = useSelector(selectUser);
	const [currentPage, setCurrentPage] = useState(1);
	const [roomId, setRoomId] = useState(
		roomIdGenearator(user._id, friendChatInfo._id)
	);
	useEffect(() => {
		const fetchHistoricalMessages = async () => {
			const response = await getHistoricalMessages(currentPage, roomId);
			const historicalMessages = response.map((msg) => {
				return {
					type:
						msg.senderID === user._id ? 'outgoingMessage' : 'incomingMessage',
					message: msg.content,
				};
			});
			setChatMessages((prevMessages) => [
				...historicalMessages,
				...prevMessages,
			]);
		};
		fetchHistoricalMessages();
		console.log(chatMessages);
	}, [roomId, currentPage]);
	useEffect(() => {
		setRoomId();
		socket.emit('joinRoom', roomId);

		// Set up the listener for incoming messages
		socket.on('receivedMessage', (receivedMessage, senderID) => {
			console.log(receivedMessage);
			console.log('senderID', senderID);
			// Handle the received message (e.g., update state)

			if (receivedMessage && senderID !== user?._id) {
				setChatMessages((prevMessage) => [
					...prevMessage,
					{ type: 'incomingMessage', message: receivedMessage },
				]);
			}
		});

		// Cleanup function to remove the listener when the component unmounts
		return () => {
			socket.off('receivedMessage');
		};
	}, []);

	// Function to handle sending messages on Enter key press
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const OutgoingMessage = e.target.value.trim();

			if (OutgoingMessage) {
				setChatMessages((prevMessage) => [
					...prevMessage,
					{ type: 'outgoingMessage', message: OutgoingMessage },
				]);
			}

			//const roomId = roomIdGenearator(user._id, friendChatInfo._id);
			socket.emit(
				'sentMessage',
				roomId,
				OutgoingMessage,
				user._id,
				friendChatInfo._id
			);
			e.target.value = ''; // Clear the input field
		}
	};
	//console.log('chatMessages: ', chatMessages);
	return (
		<div className='flex flex-col w-[320px] h-[400px] bg-white border border-gray-300 shadow-lg rounded-t-lg overflow-hidden'>
			{/* Header */}
			<nav className='flex items-center justify-between p-2 bg-gray-100 border-b'>
				<div className='flex items-center'>
					<img
						src={friendChatInfo.profilePicture}
						alt=''
						className='w-8 h-8 mr-2 rounded-full'
					/>
					<h2 className='text-sm font-medium'>
						{friendChatInfo.firstName && friendChatInfo.lastName
							? `${friendChatInfo.firstName} ${friendChatInfo.lastName} + `
							: friendChatInfo.name}
					</h2>
				</div>
				<section className='flex gap-1'>
					{' '}
					<MoreHorizIcon />
					<VideocamIcon
						fontSize='small'
						className='text-gray-500 cursor-pointer hover:text-gray-700'
					/>
					<CloseIcon
						fontSize='small'
						className='text-gray-500 cursor-pointer hover:text-gray-700'
						onClick={closeChatTab}
					/>
				</section>
			</nav>

			{/* Chat Body */}
			<div
				className={` flex-1 flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto p-3 ${
					isFriendChat ? 'block' : 'hidden'
				}`}
			>
				<section className='flex flex-col items-center p-5 mb-2 -mx-3 border-b border-gray-600 '>
					<img
						src={friendChatInfo.profilePicture}
						alt=''
						className='w-20 mr-2 rounded-full h-w-20'
					/>
					<h2 className='text-sm font-medium'>
						{friendChatInfo.firstName} {friendChatInfo.lastName}
					</h2>
					<p className='font-thin'>{friendChatInfo.bio}</p>
					<button className='px-3 mt-2 text-white bg-blue-600 rounded-xl '>
						View Profile
					</button>
				</section>

				<div className='flex flex-col mb-2 overflow-y-auto '>
					{chatMessages?.map((message, idx) =>
						message.type === 'incomingMessage' ? (
							<IncomingMessage
								key={idx}
								message={message?.message}
								idx={idx}
								user={friendChatInfo}
							/>
						) : (
							<OutgoingMessage
								key={idx}
								message={message?.message}
								idx={idx}
								user={user}
							/>
						)
					)}
				</div>
			</div>

			<footer className='flex items-center p-2 border-gray-200 justify-endborder-t'>
				<input
					type='text'
					placeholder='Type a message...'
					className='w-full p-2 text-sm rounded-lg bg-BgColor focus:outline-none focus:ring-2 focus:ring-blue-500'
					onKeyDown={handleKeyDown}
				/>
			</footer>
		</div>
	);
}

export default FriendChat;
