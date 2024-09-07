/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'; // Icon for adding image
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined'; // Icon for adding mood
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'; // Icon for more options
import createPost from '../../api/posts/postAPI.JS';

function PostForm({ handleClose }) {
	const user = useSelector(selectUser);
	const [input, setInput] = useState('');
	const [post, setPost] = useState([]);

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPost([
			{
				content: input,
			},
		]);

		setInput('');
		handleClose(e);
		try {
			await createPost(post);
		} catch (error) {
			console.error('POST FORM ERROR: Error creating post:', error);
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='w-[42rem] bg-white rounded-lg shadow-lg p-4 relative'>
				<button
					onClick={handleClose}
					className='absolute text-gray-500 top-2 right-2 hover:text-gray-800'
				>
					<CloseOutlinedIcon />
				</button>
				<div className='flex items-center mb-4'>
					<img
						src={user.profilePicture}
						alt='User Profile'
						className='w-12 h-12 mr-2 rounded-full'
					/>
					<div className='flex flex-col'>
						<p className='font-semibold'>{user.name}</p>
						<p className='text-sm text-gray-500'>Post to Anyone</p>
					</div>
				</div>
				<textarea
					className='w-full h-40 text-lg placeholder-gray-500 border-none resize-none focus:outline-none'
					placeholder='What do you want to talk about?'
					onChange={handleInputChange}
					value={input} // Bind the input value to state
				/>
				<div className='flex items-center justify-between mt-4'>
					<div className='flex space-x-2'>
						<ImageOutlinedIcon className='text-blue-500 cursor-pointer' />
						<MoodOutlinedIcon className='text-yellow-500 cursor-pointer' />
						<MoreHorizOutlinedIcon className='text-gray-500 cursor-pointer' />
					</div>
					<div className='flex items-center gap-2'>
						<AccessTimeOutlinedIcon className='text-gray-500' />
						<button
							onClick={handleSubmit} // Correctly call handleSubmit
							className={`px-4 py-1 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 ${
								!input.trim() ? 'opacity-50 cursor-not-allowed' : ''
							}`}
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostForm;
