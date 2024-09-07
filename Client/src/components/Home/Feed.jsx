/** @format */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
import InputOption from '../Options/InputOption';
import Post from './Post';
import image from '../../images/couch.png';
import ImageIcon from '@mui/icons-material/Image';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import PostForm from '../post/PostForm';

function Feed() {
	const user = useSelector(selectUser);

	const [form, setForm] = useState(false);

	const formInputs = [
		{ Icon: ImageIcon, title: 'Media', color: '#70B5F9' },
		{ Icon: EventNoteIcon, title: 'Event', color: '#de5f16' },
		{ Icon: CalendarViewDayIcon, title: 'Write article', color: '#7FC15E' },
	];

	const handleForm = (e) => {
		e.preventDefault();
		setForm(!form);
	};

	return (
		<div className='w-[40%]  relative'>
			{form === true ? (
				<div className='fixed inset-0 z-50 mt[1rem] flex items-center justify-center bg-black bg-opacity-50   '>
					<PostForm handleClose={handleForm} />
				</div>
			) : null}

			<div className=' z-0 bg-white  cursor-pointer py-[2rem] px-[2rem] pb-[1.25rem] rounded-[0.625rem] mb-[1.25rem]  shadow-lg border'>
				<div className='flex gap-1'>
					<img
						src={user?.profilePicture}
						alt=''
						className='w-[2rem] rounded-full'
					/>
					<button
						onClick={handleForm}
						className=' flex bg-BgColor border border-gray-500  text-gray-600  w-full   rounded-full p-[0.3125rem]  cursor-pointer'
					>
						{' '}
						Start a post, try writing with AI
					</button>
				</div>

				<div className='flex  py-[1rem] text-center justify-between '>
					{formInputs.map((data, index) => {
						return (
							<InputOption
								Icon={data.Icon}
								color={data.color}
								title={data.title}
								key={index}
							/>
						);
					})}
				</div>
			</div>
			{/* 
			{posts.map(({ id, postTextBody }) => (
				<Post
					key={id}
					name={user.firstName + ' ' + user.lastName}
					bio={user.bio}
					postTextBody={postTextBody}
					postPictureUrl={image}
					photoURL={user?.profilePicture}
				/>
			))} */}
		</div>
	);
}

export default Feed;
