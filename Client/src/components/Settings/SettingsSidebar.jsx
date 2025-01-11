/** @format */

import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShieldIcon from '@mui/icons-material/Shield';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotificationsIcon from '@mui/icons-material/Notifications';
const sidebarData = [
	{
		label: 'Account preferences',
		url: 'accountPreference',
		Icon: PersonIcon,
	},
	{ label: 'Sign in & security', url: 'signIn', Icon: LockIcon },
	{ label: 'Visibility', url: 'visibility', Icon: VisibilityIcon },
	{ label: 'Date privacy', url: 'dateprivacy', Icon: ShieldIcon },
	{ label: 'Advertising data', url: 'ads', Icon: NewspaperIcon },
	{ label: 'notifications', url: 'notifications', Icon: NotificationsIcon },
];
function SettingsSidebar({
	userProfilePicture,
	handleActiveSection,
	activeSection,
}) {
	return (
		<div className='flex flex-col min-h-screen p-10 bg-white'>
			<header className='flex gap-2 '>
				<img src={userProfilePicture} alt='' className='rounded-full size-10' />
				<h1 className='text-4xl font-semibold'>Settings</h1>
			</header>
			<section className='flex flex-col gap-12 mt-10 text-lg'>
				{sidebarData.map((data, idx) => {
					return (
						<div
							key={idx}
							className={`flex items-center gap-2 hover:cursor-pointer font-semibold ${
								activeSection === data.label ? 'text-green-700' : null
							} `}
							onClick={() => handleActiveSection(data.label)}
						>
							<data.Icon
								className={` text-gray-600  ${
									activeSection === data.label ? 'text-green-700' : null
								}`}
							/>
							<p> {data.label}</p>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default SettingsSidebar;
