/** @format */

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Headeroptions from '../Options/Headeroptions';
import linkedinSquare from '../../images/icons8-linkedin-96.png';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useHandlers } from '../../hooks/useHandlers';
import { useLocation } from 'react-router-dom';

function Header() {
	const { handleNavigateToHome } = useHandlers();
	const location = useLocation();

	const headerInputs = [
		{ Icon: HomeIcon, title: 'Home' },
		{ Icon: SupervisorAccountIcon, title: 'My Network' },
		{ Icon: BusinessCenterIcon, title: 'Jobs' },
		{ Icon: ChatIcon, title: 'Messaging' },
		{ Icon: NotificationsIcon, title: 'Notifications' },
		{ avatar: true, title: 'Me' }, // Avatar with dropdown should be styled to include a small down arrow
	];
	const PreumiumInput = [
		{ Icon: ViewCompactIcon, title: 'For Business', isDropdown: true }, // Add dropdown functionality
		{ Icon: WorkspacePremiumIcon, title: 'Try for 0EGP', isSpecial: true }, // Style this differently if needed
	];

	return (
		<div className='sticky top-0 flex px-[3rem] bg-white border-b border-light-gray gap-[2rem] w-full z-[999] items-center  h-[4rem]'>
			<div className='flex items-center mr-auto'>
				<button onClick={handleNavigateToHome}>
					<img
						src={linkedinSquare}
						alt='linkedin logo'
						className='object-cover w-[2.8rem]'
					/>
				</button>
				<div className='flex items-center w-[20rem] px-2 bg-[#eef3f8] rounded-md py-2 text-gray-600'>
					<SearchIcon className='text-gray-500' />
					<input
						type='text'
						placeholder='Search'
						className='w-full ml-2 text-sm bg-transparent border-none outline-none'
					/>
				</div>
			</div>
			<div className='flex space-x-4'>
				{headerInputs.map((data, index) => (
					<Headeroptions
						key={index}
						Icon={data.Icon}
						title={data.title}
						avatar={data.avatar}
						location={location.pathname}
					/>
				))}
				<div className='flex gap-3 pl-2 border-l border-gray-300 '>
					{PreumiumInput.map((data, index) => (
						<Headeroptions
							key={index}
							Icon={data.Icon}
							title={data.title}
							isDropdown={data.isDropdown}
							isSpecial={data.isSpecial}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Header;
