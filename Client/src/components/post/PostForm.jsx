/** @format */

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { createPost } from '../../api/posts/postAPI.js';
import { initializeSocket } from '../../Sockets/postSockets.js';
import { uploadPostPicToCloud } from '../../api/files/filesAPI.js';

function PostForm({ handleClose }) {
	const user = useSelector(selectUser);
	const [input, setInput] = useState('');
	const [postPic, setPostPic] = useState(null);
	const [tempPicURL, setTempPicURL] = useState(null);
	const [isPicAvailable, setisPicAvailable] = useState(false);

	const fileInputRef = useRef(null);
	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');

		try {
			let imgURL = null;
			if (postPic) {
				try {
					imgURL = await uploadPostPicToCloud(postPic);
					console.log('imgURL: ', imgURL);
				} catch (error) {
					console.log('error uploading the pic to the cloud');
				}
			}

			await createPost(
				[
					{
						content: input,
						postPic: imgURL || [],
						username: user.firstName + ' ' + user.lastName,
						bio: user.bio,
						profilePicture: user.profilePicture,
					},
				],
				token
			);
			const socket = initializeSocket();
			socket.emit('postUpdate');
			setInput('');
			setPostPic(null);
			setisPicAvailable(false);
			handleClose(e);
		} catch (error) {
			console.error('POST FORM ERROR: Error creating post:', error);
		}
	};
	const hanldePic = () => {
		fileInputRef.current.click();
	};
	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setPostPic(file);
			setTempPicURL(URL.createObjectURL(file));
			setisPicAvailable(true);
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
			<div className='flex flex-col align-bottom w-[42rem] h-fit bg-white rounded-lg shadow-lg p-4 mt-[5rem] relative   overflow-auto overscroll-auto'>
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
						className='object-cover w-12 h-12 mr-2 rounded-full'
					/>
					<div className='flex flex-col'>
						<p className='font-semibold'>{user.name}</p>
						<p className='text-sm text-gray-500'>Post to Anyone</p>
					</div>
				</div>
				<div className='h-fit'>
					<textarea
						className='w-full h-40 p-2 text-lg placeholder-gray-500 border border-gray-400 rounded-lg resize-none focus:outline-none'
						placeholder='What do you want to talk about?'
						onChange={handleInputChange}
						value={input}
					/>
					{isPicAvailable === true ? (
						<div className='flex justify-center'>
							<img src={tempPicURL} alt='' className='w-fit h-[15rem] ' />
						</div>
					) : null}
				</div>

				<div className='flex items-center justify-between mt-4'>
					<div className='flex space-x-2'>
						<input
							type='file'
							ref={fileInputRef}
							onChange={handleFileChange}
							style={{ display: 'none' }}
							accept='image/*' // Optional: restrict file types
						/>
						<ImageOutlinedIcon
							className='text-blue-500 rounded-lg cursor-pointer hover:bg-gray-300'
							onClick={hanldePic}
						/>
						<MoodOutlinedIcon className='text-yellow-500 cursor-pointer ' />
						<MoreHorizOutlinedIcon className='text-gray-500 cursor-pointer' />
					</div>
					<div className='flex items-center gap-2'>
						<AccessTimeOutlinedIcon className='text-gray-500' />
						<button
							onClick={handleSubmit} // Correctly call handleSubmit
							className={`px-4 py-1 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 ${
								!input.trim() ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={!input.trim() ? true : false}
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
