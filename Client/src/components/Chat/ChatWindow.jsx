/** @format */

import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectConnections } from '../../Redux/sllices/connectionSlice';
import FriendChat from './FriendChat';
import NewChat from './NewChat';

function ChatWindow({ closeChatTab, openNewChatTab, messagingTabID }) {
	const connections = useSelector(selectConnections);
	const [friendChatInfo, setFriendChatInfo] = useState();
	const [isFriendChat, setIsFriendChat] = useState(false);
	const [newChatTabOpen, setNewChatTabOpen] = useState(true);

	const handleNewChatTabOpen = () => {
		setNewChatTabOpen((prevState) => !prevState);
	};
	const handleFriendChat = (friendData) => {
		closeChatTab(messagingTabID);
		setIsFriendChat((prevState) => !prevState);

		setFriendChatInfo(friendData);

		openNewChatTab(friendData._id, 'ChatWindow');
	};
	return (
		<div>
			{isFriendChat ? (
				<FriendChat
					friendChatInfo={friendChatInfo}
					isFriendChat={isFriendChat}
					CloseIcon={CloseIcon}
					closeChatTab={() => closeChatTab(friendChatInfo._id)}
				/>
			) : (
				<NewChat
					newChatTabOpen={newChatTabOpen}
					handleNewChatTabOpen={handleNewChatTabOpen}
					CloseIcon={CloseIcon}
					closeChatTab={closeChatTab}
					connections={connections}
					handleFriendChat={handleFriendChat}
					chatId={messagingTabID}
				/>
			)}
		</div>
	);
}

export default ChatWindow;
