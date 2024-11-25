/** @format */

import React, { useEffect } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FocusButton from '../Buttons/FocusButton';
import OtherButton from '../Buttons/OtherButton';
import NoMessages from './NoMessages';
import ChatList from './ChatList';
import { useChat } from '../../hooks/useChat';
import { fetchChats } from '../../api/chatAPi';
import SearchButton from '../Buttons/SearchButton';
import { useUser } from '../../hooks/useUser';
function MessagingTab({ openNewChatTab, closeChatTab, setMessagingTabID }) {
	const {
		handleMessagingTabOpen,
		handleFocusChange,
		handleOtherChange,
		setFriendsList,
		isMessagingTabOpen,
		isFocused,
		isOther,
		friendsList,
	} = useChat();

	const { user } = useUser();
	const chatID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;

	useEffect(() => {
		const getChats = async () => {
			const response = await fetchChats(user._id);

			const data = response;

			setFriendsList(data);
		};
		getChats();
	}, []);
	return (
		<div className='grid grid-rows-[auto_1fr]  w-[18rem] bg-white shadow-xl rounded-t-md '>
			<nav
				className={`z-50 flex items-center  justify-between p-2 mb-1 bg-white rounded-t-md border-b  ${
					isMessagingTabOpen ? 'bg-blue-00  ' : ' bg-white text-black'
				}`}
			>
				<section className='flex items-center gap-2'>
					<img src={user?.profilePicture} alt='' className='h-8 rounded-full' />
					<p className='font-semibold'>Messaging</p>
				</section>
				<section className='flex items-center gap-2'>
					<MoreHorizIcon />
					<EditNoteIcon
						fontSize='large'
						onClick={() => {
							setMessagingTabID((prevMessagingID) => [
								...prevMessagingID,
								chatID,
							]);
							openNewChatTab(chatID, 'MessagingTab');
						}}
						className='p-1 rounded-full cursor-pointer hover:bg-gray-600 hover:bg-opacity-75'
					/>
					{!isMessagingTabOpen ? (
						<KeyboardArrowUpIcon
							className='p-1 rounded-full cursor-pointer hover:bg-gray-200'
							fontSize='large'
							onClick={handleMessagingTabOpen}
						/>
					) : (
						<KeyboardArrowDownIcon
							className='p-1 rounded-full cursor-pointer hover:bg-gray-600 hover:bg-opacity-75'
							fontSize='large'
							onClick={handleMessagingTabOpen}
						/>
					)}
				</section>
			</nav>

			<section
				className={`transition-all duration-300 ease-in-out overflow-auto ${
					isMessagingTabOpen ? 'max-h-[90vh] min-h-[65vh] ' : 'max-h-0'
				}`}
			>
				<SearchButton />

				<section className='flex mt-2'>
					<FocusButton
						handleFocusChange={handleFocusChange}
						isFocused={isFocused}
					/>
					<OtherButton
						handleOtherChange={handleOtherChange}
						isOther={isOther}
					/>
				</section>
				<div className='flex flex-col gap-4 h-fit'>
					{friendsList.length === 0 ? (
						<NoMessages />
					) : (
						<ChatList
							setMessagingTabID={setMessagingTabID}
							friendsList={friendsList}
							closeChatTab={closeChatTab}
							openNewChatTab={openNewChatTab}
						/>
					)}
				</div>
			</section>
		</div>
	);
}

export default MessagingTab;
