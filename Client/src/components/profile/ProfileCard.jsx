/** @format */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
import { useHandlers } from '../../hooks/useHandlers';
import LoadingScreen from '../LoadingScreen';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

function ProfileCard() {
	const { loading, setLoading } = useHandlers();
	const user = useSelector(selectUser);

	// Handle loading state correctly with useEffect
	useEffect(() => {
		if (!user) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [user, setLoading]); // Dependency array includes user and setLoading

	if (loading) return <LoadingScreen />;

	return (
		<div className='flex flex-col pb-[2.5rem] ml-[0.9rem]  bg-white gap-[0.8rem] rounded-xl border border-gray-300 shadow-lg  mt-[0.5rem]'>
			<div className='relative '>
				<img
					src={user?.coverPicture}
					alt='coverPicture'
					className='w-full h-auto rounded-t-xl'
				/>
				<img
					src={user?.profilePicture}
					alt='profilePicture'
					className='absolute top-[5.7rem] left-[7.5rem] transform -translate-x-[6rem] -translate-y-[0.8rem] w-[10rem] h-[10rem] border-[0.3rem] border-white rounded-full'
				/>
			</div>

			<div className='flex justify-end mr-4 '>
				<EditOutlinedIcon sx={{ color: 'gray' }} fontSize='medium' />
			</div>

			<div className='flex flex-col ml-[1.6rem]  '>
				<div className='flex items-center gap-2'>
					<h1 className='text-2xl'>{user?.firstName + ' ' + user?.lastName}</h1>
					<VerifiedUserOutlinedIcon />
				</div>
				<div>
					<p className=' text-md'>{user?.bio}</p>

					<div className='flex items-center gap-1 '>
						<p className='text-sm text-gray-600'>
							{user?.city || null}, {user.country_region || null}{' '}
						</p>
						<p className='text-xs'>•</p>
						<button className='text-sm font-semibold text-LinkedInBlue'>
							Contact Info
						</button>
					</div>

					<button className='mt-[0.4rem] text-sm font-normal text-LinkedInBlue'>
						{user.connectionCount === 0
							? '500+ connections'
							: `${user.connectionCount} connections`}
					</button>
				</div>
			</div>

			<div className='flex gap-[0.5rem] ml-[1.5rem]   text-lg font-semibold'>
				<button className=' w-[5.8rem] h-[2rem]    text-white  rounded-full bg-LinkedInBlue hover:bg-blue-900'>
					Open To
				</button>
				<button className=' w-[10.9rem] h-[2rem]  text-LinkedInBlue  border-LinkedInBlue border rounded-full  hover:bg-gray-100 '>
					Add a profile section
				</button>
				<button className=' w-[4rem] h-[2rem]  text-gray-600 border-gray-600 border  rounded-full  hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 hover:border-2'>
					More
				</button>
			</div>

			<div className='flex flex-col bg-OpenToWork rounded-md w-[89%] h-[5rem]  ml-[1.5rem] p-3'>
				<div className='flex mt-[0.5rem]'>
					<h1 className='text-sm font-semibold'>Open to work</h1>
					<button className='ml-auto'>
						<EditOutlinedIcon fontSize='sm' />
					</button>
				</div>
				<p>This is a placeholder for your open to work section.</p>
			</div>
		</div>
	);
}

export default ProfileCard;
