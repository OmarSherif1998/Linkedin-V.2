/** @format */

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EastIcon from '@mui/icons-material/East';
import { Avatar } from '@mui/material';
import image from '../../images/pb.jpg';
function Connection({ pageSpecs }) {
	const users = [
		{
			Name: 'John Doe',
			bio: 'Backend Developer',
			pic: image,
		},
		{
			Name: 'Zack Doe',
			bio: 'Frontend Developer',
			pic: '',
		},
		{ Name: 'Mohamed Ahmed', bio: 'HR Manager', pic: '' },
		{
			Name: 'Tom Smith',
			bio: 'Software Architect',
			pic: '',
		},
	];
	const newsUser = (Name, bio, pic) => (
		<div className='flex flex-col gap-3 mb-3'>
			<div className='flex gap-2 p-2 text-black cursor-pointer hover:bg-whitesmoke'>
				<Avatar sizes='lg' src={pic}>
					{Name[0]}
				</Avatar>
				<div className='flex flex-col gap-2 '>
					<div>
						{' '}
						<h4 className='text-sm'>{Name}</h4>
						<p className='text-xs text-gray-500'>{bio}</p>
					</div>

					<button className='flex border-[0.125rem] font-normal text-gray-500 hover:text-black hover:font-medium p-1 items-center hover:bg-BgColor border-gray-500 hover:border-black rounded-2xl w-[7rem] justify-center gap-2 transition-all duration-100 hover:shadow-lg'>
						<AddIcon className='text-black' /> <p>Follow</p>
					</button>
				</div>
			</div>
			<div className='flex mx-4 border border-gray-200'></div>
		</div>
	);
	return (
		<div
			className={`flex flex-col w-[${pageSpecs?.width}] p-2 bg-white border border-gray-300 rounded-lg shadow-xl h-fit border-light-gray`}
		>
			<div className='flex flex-col p-2'>
				<div className='flex gap-1'>
					<h2 className='text-base font-medium text-gray-600'>
						{pageSpecs?.title}
					</h2>
				</div>
				{users.map((user, index) => (
					<div key={index}>{newsUser(user.Name, user.bio, user.pic)}</div>
				))}
			</div>
			<button className='flex items-center justify-center gap-1 rounded-md hover:bg-BgColor'>
				<h1>View all recommendations </h1>
				<EastIcon fontSize='sm' />
			</button>
		</div>
	);
}

export default Connection;
