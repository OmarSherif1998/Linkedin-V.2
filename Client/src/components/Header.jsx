/** @format */

import React from 'react';

// import { useDispatch } from 'react-redux';
// import { logout } from '../features/userSlice';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Headeroptions from './Headeroptions';

function Header() {
	// const dispatch = useDispatch();
	// const logoutOfApp = () => {
	// 	dispatch(logout());
	// 	auth.signOut();
	// };
	const headerInputs = [
		{ Icon: HomeIcon, title: 'Home' },
		{ Icon: SupervisorAccountIcon, title: 'My Network' },
		{ Icon: BusinessCenterIcon, title: 'Jobs' },
		{ Icon: ChatIcon, title: 'Messaging' },
		{ Icon: NotificationsIcon, title: ' Notifications' },
		{ avatar: true, title: 'Me' },
	];
	return (
		<div className='sticky top-0 flex justify-center bg-white border-b border-light-gray gap-[3rem] w-full z-[999] items-center h-[4.5rem]'>
			<div className='flex'>
				<img
					src={require('../images/linkedin.png')}
					alt='linkedin logo'
					className='object-contain h-[1.5rem]'
				/>
				<div className='flex items-center h-full bg-[#eef3f8] rounded-lg p-2 text-gray-500 ml-4'>
					<SearchIcon />
					<input
						type='text'
						placeholder='Search'
						className='ml-2 bg-transparent border-none outline-none'
					/>
				</div>
			</div>
			<div className='flex py-[0.5rem]'>
				{headerInputs.map((data, index) =>
					data.Icon ? (
						<Headeroptions key={index} Icon={data.Icon} title={data.title} />
					) : (
						<Headeroptions key={index} avatar={true} title={data.title} />
					)
				)}
			</div>
		</div>
	);
}

export default Header;
