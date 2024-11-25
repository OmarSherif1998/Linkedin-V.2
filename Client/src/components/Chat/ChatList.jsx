/** @format */

import React, { useEffect, useState } from 'react';

function ChatList({ friendsList, closeChatTab, openNewChatTab }) {
	const [isUser, setIsUser] = useState();
	const [isFriendChat, setIsFriendChat] = useState(false);
	const [friendChatInfo, setFriendChatInfo] = useState();
	const [newChatTabOpen, setNewChatTabOpen] = useState(true);

	// const handleNewChatTabOpen = () => {
	// 	setNewChatTabOpen((prevState) => !prevState);
	// };
	//console.log(friendsList);
	const handleFriendChat = (friendData, component) => {
		// console.log('Friend Data:', friendData);
		// console.log('Component Name:', component);
		// const chatID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
		// console.log('component name:', component);
		// closeChatTab(chatID);
		// setIsFriendChat((prevState) => !prevState);
		// console.log('chatID:', chatID);
		// setFriendChatInfo(friendData);
		// openNewChatTab(friendData._id, 'ChatList');
	};

	return (
		<div>
			{friendsList?.map((friend, idx) => (
				<div
					className='flex items-center w-full gap-3 p-3 cursor-pointer hover:bg-gray-200'
					key={idx}
					onClick={() => {
						handleFriendChat(friend, 'ChatList');
					}}
				>
					<img
						src={friend.profilePicture}
						alt=''
						className='object-contain w-8 rounded-full'
					/>
					{friend.name}
				</div>
			))}
		</div>
	);
}

export default ChatList;
