/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/sllices/userSlice';
import SettingsSidebar from '../components/Settings/SettingsSidebar';
import AccountPreferences from '../components/Settings/AccountPreferences';

function Settings() {
	const user = useSelector(selectUser);
	const [activeSection, setActiveSection] = useState('Account preferences');
	const handleActiveSection = (label) => {
		setActiveSection(label);
	};

	return (
		<div className='flex justify-start w-full gap-40 pr-40'>
			<SettingsSidebar
				userProfilePicture={user.profilePicture}
				handleActiveSection={handleActiveSection}
				activeSection={activeSection}
				className='w-1/4'
			/>
			<div className='flex justify-center flex-grow pt-10 '>
				<AccountPreferences user={user} className />
			</div>
		</div>
	);
}

export default Settings;
