/** @format */

import React, { useState } from 'react';

function NewChat({
	handleNewChatTabOpen,
	connections,
	handleFriendChat,
	CloseIcon,
	handleChatParticpantsTabOpen,
	closeChatTab,
	chatId,
}) {
	const [newChatID] = useState(chatId);
	// console.log(connections);
	return (
		<div className='flex flex-col border border-gray-600  w-[320px] bg-white shadow-xl rounded-t-md '>
			<nav
				onClick={handleChatParticpantsTabOpen}
				className='z-10 flex items-center justify-between p-2 mb-1 bg-white border-b rounded-t-md'
			>
				<h2 className='text-md'>New message </h2>{' '}
				{/* log the chatID next to new message if debugging is needed */}
				<CloseIcon
					fontSize='large'
					className='p-2 rounded-full cursor-pointer hover:bg-gray-200'
					onClick={() => closeChatTab(newChatID)}
				/>
			</nav>

			{handleNewChatTabOpen && (
				<div
					className={`transition-all duration-300 ease-in-out overflow-auto ${
						handleNewChatTabOpen ? 'max-h-[80vh] min-h-[65vh]' : 'max-h-0'
					}`}
				>
					<nav className='flex justify-center gap-2 border-t border-b border-gray-700'>
						<input
							type='text'
							placeholder='Search connections'
							className='w-full p-1 bg-transparent border-0 '
						/>
					</nav>
					<div className='flex flex-col gap-4 p-3 text-gray-600 h-fit'>
						<p>Suggested:</p>
						{connections.map((connection, index) => (
							<div
								key={index}
								className='flex items-center gap-2 p-2 hover:bg-gray-00 hover:cursor-pointer'
								onClick={() => handleFriendChat(connection, 'NewChat')}
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
		</div>
	);
}

export default NewChat;
