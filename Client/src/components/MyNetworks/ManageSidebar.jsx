/** @format */

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TagIcon from '@mui/icons-material/Tag';
const buttons = [
	{ text: 'Connections', icon: <PeopleIcon /> },
	{ text: 'Contacts', icon: <PersonIcon /> },
	{ text: 'Following & Followers', icon: <ImportContactsIcon /> },
	{ text: 'Groups', icon: <GroupsIcon /> },
	{ text: 'Events', icon: <CalendarMonthIcon /> },
	{ text: 'Pages', icon: <ArticleIcon /> },
	{ text: 'Newsletter', icon: <NewspaperIcon /> },
	{ text: 'Hashtag', icon: <TagIcon /> },
];
function ManageSidebar() {
	const [isManageOpen, setIsManageOpen] = useState(false);
	const handleManageTab = () => {
		setIsManageOpen(!isManageOpen);
	};
	return (
		<aside className='flex flex-col gap-5 p-6 mt-10 bg-white rounded-lg shadow-lg'>
			<button
				className='flex items-center justify-between pb-2 text-xl font-semibold text-gray-700 border-b-2'
				onClick={handleManageTab}
			>
				Manage my network{' '}
				<KeyboardArrowDownIcon
					fontSize='large'
					className='p-1 rounded-full hover:bg-gray-200'
				/>
			</button>
			{isManageOpen && (
				<div className='flex flex-col justify-between gap-4 '>
					{buttons.map((button, idx) => (
						<button
							className='flex items-center gap-5 p-2 text-xl text-gray-600 hover:bg-gray-100 hover:rounded-lg'
							key={idx}
						>
							{button.icon}
							{button.text}
						</button>
					))}
				</div>
			)}
		</aside>
	);
}

export default ManageSidebar;
