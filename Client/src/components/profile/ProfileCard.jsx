/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
import { useHandlers } from '../../hooks/useHandlers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PicForm from './PicForm';
import DetailsForm from './DetailsForm';
function ProfileCard({ type, userDetails }) {
	const user = useSelector(selectUser);
	const { handleChangePic, handleEditInfo, isDetailsForm, isPicForm } =
		useHandlers();
	const [rand] = useState(Math.floor(Math.random() * 500));
	const currentUser = type === 'Me' ? user : userDetails[0] || {};

	const {
		_id,
		coverPicture,
		profilePicture,
		firstName,
		lastName,
		username,
		bio,
		city,
		country_region,
		connectionCount,
	} = currentUser; // destructuring user or userDetails[0]

	const connectionText =
		connectionCount === 0
			? `${rand} connections`
			: `${connectionCount} connections`;

	return (
		<div className='flex flex-col pb-[2rem]  bg-white gap-[2rem] rounded-xl border border-gray-400 shadow-lg mt-[0.5rem]'>
			<div className='relative'>
				<img
					src={coverPicture}
					alt='coverPicture'
					className='w-full h-auto rounded-t-xl'
				/>

				<img
					onClick={type === 'Me' ? handleChangePic : undefined}
					src={profilePicture}
					alt='profilePicture'
					className='absolute bg-white cursor-pointer top-[4.7rem] left-[7rem] transform -translate-x-[6rem] translate-y-[.2rem] w-[10rem] h-[10rem] object-cover border-[0.3rem] border-white rounded-full'
				/>

				{isPicForm && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<PicForm
							handleChangePic={handleChangePic}
							currentUser={currentUser}
						/>
					</div>
				)}
			</div>

			<div className='flex flex-col ml-[1.6rem]'>
				<div className='flex'>
					<div className='flex items-center gap-2'>
						<h1 className='text-2xl'>
							{type === 'Me' ? `${firstName} ${lastName}` : username}
						</h1>
						<VerifiedUserOutlinedIcon />
					</div>{' '}
					{type === 'Me' ? (
						<div
							onClick={handleEditInfo}
							className='flex p-1 ml-[75%] rounded-full cursor-pointer border-white  hover:bg-gray-100'
						>
							<EditOutlinedIcon sx={{ color: 'gray' }} fontSize='medium' />
						</div>
					) : null}
					{isDetailsForm === true ? (
						<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
							<DetailsForm
								handleEditInfo={handleEditInfo}
								currentUser={currentUser}
							/>
						</div>
					) : null}
				</div>

				<div>
					<p className='text-md'>{bio}</p>
					<div className='flex items-center gap-1'>
						<p className='text-sm text-gray-600'>
							{city}, {country_region}
						</p>
						<p className='text-xs'>•</p>
						<button className='text-sm font-semibold text-LinkedInBlue hover:underline'>
							Contact Info
						</button>
					</div>
					<button className='mt-[0.4rem] text-sm font-normal text-LinkedInBlue'>
						{connectionText}
					</button>
				</div>
			</div>

			<div className='flex gap-[0.5rem] ml-[1.5rem] text-lg font-semibold'>
				{type === 'Me' ? (
					<div className='flex gap-[0.5rem]'>
						<button className='w-fit h-[2rem] px-5 text-white rounded-full bg-LinkedInBlue hover:bg-blue-900'>
							Open To
						</button>
						<button className='w-fit h-[2rem] px-5 text-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-gray-100'>
							Add a profile section
						</button>
					</div>
				) : (
					<div className='flex gap-[0.5rem]'>
						{user.connections.includes(currentUser._id) ? null : (
							<button className='flex gap-1 items-center w-fit px-5 h-[2rem] text-white bg-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-blue-900 '>
								<PersonAddIcon />
								<p>Connect</p>
							</button>
						)}
						<button className='flex gap-1  w-fit px-5 h-[2rem] text-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-gray-100 '>
							<SendIcon className='transform -rotate-45' />
							<p>Message</p>
						</button>
					</div>
				)}

				<button className='w-[fit] h-[2rem] px-5 text-gray-600 border-gray-600 border rounded-full hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 hover:border-2'>
					More
				</button>
			</div>
			{type === 'Me' ? (
				<div className='flex flex-col bg-OpenToWork rounded-md w-[89%] h-[5rem] ml-[1.5rem] p-3'>
					<div className='flex mt-[0.5rem]'>
						<h1 className='text-sm font-semibold'>Open to work</h1>
						<button className='ml-auto'>
							<EditOutlinedIcon fontSize='sm' />
						</button>
					</div>
					<p>This is a placeholder for your open to work section.</p>
				</div>
			) : null}
		</div>
	);
}

export default ProfileCard;
