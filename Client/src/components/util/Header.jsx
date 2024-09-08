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
import Headeroptions from '../Options/Headeroptions';
import linkedinSquare from '../../images/icons8-linkedin-96.png';

function Header() {
	const headerInputs = [
		{ Icon: HomeIcon, title: 'Home' },
		{ Icon: SupervisorAccountIcon, title: 'My Network' },
		{ Icon: BusinessCenterIcon, title: 'Jobs' },
		{ Icon: ChatIcon, title: 'Messaging' },
		{ Icon: NotificationsIcon, title: ' Notifications' },
		{ avatar: true, title: 'Me' },
	];

	return (
		<div className='sticky top-0 flex  px-[3rem] bg-white border-b border-light-gray gap-[3rem] w-full z-[999] items-center h-[4.5rem]'>
			<div className='flex items-center mr-auto'>
				<img
					src={linkedinSquare}
					alt='linkedin logo'
					className='object-contain w-[4rem]	 '
				/>
				<div className='flex items-center w-[25rem] px-2 bg-[#eef3f8] rounded-lg py-3 text-gray-500 '>
					<SearchIcon />
					<input
						type='text'
						placeholder='Search'
						className='ml-2 text-lg w-[25rem] bg-transparent border-none outline-none'
					/>
				</div>
			</div>
			<div className='flex py-[0.5rem] m-auto'>
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
