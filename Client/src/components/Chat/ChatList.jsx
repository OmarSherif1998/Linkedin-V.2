/** @format */

import React from 'react';

function ChatList({ friendsList, openNewChatTab }) {
	// console.log(friendsList);
	return (
		<div>
			{friendsList?.map((friend, idx) => (
				<div
					className='flex items-center w-full gap-3 p-3 cursor-pointer hover:bg-gray-200'
					key={idx}
					onClick={() => {
						openNewChatTab(friend._id, 'ChatList');
					}}
				>
					<img
						src={friend.profilePicture}
						alt=''
						className='object-cover rounded-full size-8'
					/>
					{friend.name}
				</div>
			))}
		</div>
	);
}

export default ChatList;
