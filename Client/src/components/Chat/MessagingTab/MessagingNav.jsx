/** @format */

import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function MessagingNav({
	isMessagingTabOpen,
	user,
	openNewChatTab,
	handleMessagingTabOpen,
}) {
	return (
		<nav
			className={`z-50 flex items-center  justify-between p-2 mb-1 bg-white rounded-t-md border-b  ${
				isMessagingTabOpen ? 'bg-blue-400  ' : ' bg-white text-black'
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
					onClick={openNewChatTab}
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
	);
}

export default MessagingNav;
