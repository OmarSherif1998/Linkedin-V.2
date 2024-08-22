/** @format */

import React from 'react';

// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';
import { Avatar } from '@mui/material';
const user = {
	displayName: 'Omar Sherif',
	email: 'omar@example.com',
	bio: 'Software Engineer',
};
function Headeroptions({ avatar, Icon, title, onClick }) {
	return (
		<div
			onClick={onClick}
			className='flex flex-col items-center justify-center mr-5 text-gray-500 cursor-pointer hover:text-black '
		>
			{Icon && <Icon className='object-contain w-6 h-7' />}
			{avatar && (
				<Avatar className='object-contain ' src={user?.photoURL}>
					{user?.displayName[0]}
				</Avatar>
			)}
			<h3 className='text-xs font-normal'> {title} </h3>
		</div>
	);
}

export default Headeroptions;
