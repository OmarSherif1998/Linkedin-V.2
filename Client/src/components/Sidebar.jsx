/** @format */

import React from 'react';

import { Avatar } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';

function Sidebar() {
	const recentitems = (topics) => (
		<div className='flex-col '>
			<p className='mx-[.625rem] gap-2 hover:bg-whitesmoke hover:rounded-lg hover:cursor-pointer hover:text-red'>
				#{topics}
			</p>
		</div>
	);
	//const user = useSelector(selectUser);
	const user = {
		displayName: 'Omar Sherif',
		email: 'omar@example.com',
		bio: 'Software Engineer',
	};
	const recentData = [
		'reactJS',
		'Programming',
		'ChatGPT',
		'NextJS',
		'AngularJS',
	];
	return (
		<div className='rounded-lg w-[12%] '>
			<div className='flex flex-col items-center border border-lightslategray border-t-0 rounded-t-lg bg-white pb-2.5'>
				<img
					src='https://scx1.b-cdn.net/csz/news/800/2017/theoreticala.jpg'
					alt=''
					className='mb-[-1.25rem] w-full h-[3.75rem] rounded-t-lg object-cover'
				/>
				<Avatar src={user.photoURL} className=''>
					{user.displayName[0]}
				</Avatar>
				<h2 className='text-lg text-black'>{user.displayName}</h2>
				<h4 className='text-xs text-gray-600'>{user.bio}</h4>
			</div>
			<div className='p-2.5 mb-2.5 border border-lightgray bg-white rounded-b-lg'>
				<div className='mt-2.5 flex gap-[0.3rem] items-center'>
					<p className='text-sm font-semibold text-gray-600'>
						Who viewed your profile
					</p>
					<p className='font-bold text-[#0a66c2]'>2581</p>
				</div>
				<div className='mt-2.5 flex gap-[0.3rem] items-center'>
					<p className='text-sm font-semibold text-gray-600'>Views on posts</p>
					<p className='font-bold text-[#0a66c2]'>2367</p>
				</div>
			</div>
			<div className='text-left p-2.5 border border-lightgray bg-white rounded-lg mt-2.5'>
				<p className='text-sm pb-2.5'>Recent</p>
				{recentData.map((date) => recentitems(date))}
			</div>
		</div>
	);
}

export default Sidebar;
