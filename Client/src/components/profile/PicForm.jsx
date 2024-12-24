/** @format */

import React, { useRef } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import { uploadPicToCloud } from '../../api/filesAPI';
import { updateUserProfilePic } from '../../api/userAPI';

function PicForm({ handleChangePic, currentUserID, profilePicture }) {
	const fileInputRef = useRef(null);
	// Function to trigger the hidden file input click
	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	// Handle file selection
	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			try {
				const imgURL = await uploadPicToCloud(file);

				await updateUserProfilePic(currentUserID, imgURL.path);
			} catch (error) {
				console.log('error updating the profile picture: ' + error);
			}
		}
	};

	return (
		<div className='relative flex flex-col justify-between w-[45rem] h-[30rem] gap-4 p-6 text-center bg-picForm rounded-lg shadow-lg'>
			<h1 className='flex mr-auto text-lg font-semibold text-white'>
				Profile photo
			</h1>
			<button
				onClick={handleChangePic}
				className='absolute p-2 text-white top-2 right-2'
			>
				<CloseIcon />
			</button>
			<img
				src={profilePicture}
				alt='profilePicture'
				className='w-[15rem] h-[15rem] mx-auto rounded-full border border-gray-50 object-cover'
			/>
			<div className='flex gap-10 pt-2 text-lg text-white border-t border-gray-500'>
				<button className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 hover:bg-opacity-5'>
					<EditIcon />
					Edit
				</button>

				{/* Hidden file input */}
				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					style={{ display: 'none' }}
					accept='image/*' // Optional: restrict file types
				/>

				{/* Button to trigger file input */}
				<button
					onClick={handleButtonClick}
					className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 hover:bg-opacity-5'
				>
					<CameraAltIcon />
					Add photo
				</button>

				<button className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 hover:bg-opacity-5'>
					<AddPhotoAlternateIcon /> Frames
				</button>
				<button className='flex flex-col items-center gap-1 p-2 ml-auto rounded-lg hover:bg-gray-50 hover:bg-opacity-5'>
					<DeleteIcon />
					Delete
				</button>
			</div>
		</div>
	);
}

export default PicForm;
