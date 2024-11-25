/** @format */

import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectConnections } from '../../Redux/sllices/connectionSlice';
import UserChat from './UserChat';

function ChatParticipants({ setIsHandleChatParticipants }) {
	const connections = useSelector(selectConnections);
	const [isChatParticpantsTabOpen, setIsChatParticpantsTabOpen] =
		useState(true);

	//const [UserChatInfo, setIsUserChatInfo] = useState({});

	const handleChatParticpantsTabOpen = () => {
		console.log(isChatParticpantsTabOpen);
		setIsChatParticpantsTabOpen((prevState) => !prevState);
	};
	const handleUserChat = (connection) => {
		setIsHandleChatParticipants(false);
		//setIsUserChatInfo(connection);
	};
	//console.log(connections);
	return (
		<div className='flex flex-col border border-gray-600  w-[25rem] bg-white shadow-xl rounded-t-md '>
			<nav
				onClick={handleChatParticpantsTabOpen}
				className='z-10 flex items-center justify-between p-2 mb-1 bg-white border-b rounded-t-md'
			>
				<h2 className='text-md'>New message</h2>
				<CloseIcon
					fontSize='large'
					className='p-2 rounded-full cursor-pointer hover:bg-gray-200'
					onClick={() => setIsHandleChatParticipants(false)}
				/>
			</nav>

			{isChatParticpantsTabOpen && (
				<div
					className={`transition-all duration-300 ease-in-out overflow-auto ${
						isChatParticpantsTabOpen ? 'max-h-[80vh] min-h-[65vh]' : 'max-h-0'
					}`}
				>
					<nav className='flex justify-center gap-2 border-t border-b border-gray-700'>
						<input
							type='text'
							placeholder='Type a name'
							className='w-full p-1 bg-transparent border-0 '
						/>
					</nav>
					<div className='flex flex-col gap-4 p-3 text-gray-600 h-fit'>
						<p>Suggested:</p>
						{connections.map((connection, index) => (
							<div
								key={index}
								className='flex items-center gap-2 p-2 hover:bg-gray-200 hover:cursor-pointer'
								onClick={() => handleUserChat(connection)}
							>
								<img
									src={connection.profilePicture}
									alt=''
									className='w-12 h-12 rounded-full'
								/>
								<div className='flex flex-col gap-1'>
									<h3 className='text-xs text-gray-600'>
										{connection.firstName + ' ' + connection.lastName}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{/* : (<UserChat ChatInfo={UserChatInfo} />) */}
		</div>
	);
}

export default ChatParticipants;
