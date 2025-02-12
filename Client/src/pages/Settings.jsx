/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/sllices/userSlice';
import SettingsSidebar from '../components/Settings/SettingsSidebar';
import SigninSecurity from '../components/Settings/SigninSecurity';
import AccountPreferences from '../components/Settings/AccountPreferences';
import Visibility from '../components/Settings/Visibility';
import DataPrivacy from '../components/Settings/DataPrivacy';
import Notifications from '../components/Settings/Notifications';
import AdvertisingData from '../components/Settings/AdvertisingData';

function Settings() {
	const user = useSelector(selectUser);
	const [activeSection, setActiveSection] = useState('Account preferences');
	const handleActiveSection = (label) => {
		setActiveSection(label);
	};

	const ActiveSection = (activeSection) => {
		switch (activeSection) {
			case 'Account preferences':
				return <AccountPreferences />;
			case 'Sign in & security':
				return <SigninSecurity user={user} />;
			case 'Visibility':
				return <Visibility />;
			case 'Data privacy':
				return <DataPrivacy />;
			case 'Advertising data':
				return <AdvertisingData />;
			case 'Notifications':
				return <Notifications />;
			default:
				return <AccountPreferences />;
		}
	};

	return (
		<div className='flex w-full gap-40 pr-40'>
			<SettingsSidebar
				userProfilePicture={user.profilePicture}
				handleActiveSection={handleActiveSection}
				activeSection={activeSection}
			/>

			<div className='flex justify-center flex-grow py-10 '>
				{ActiveSection(activeSection)}
			</div>
		</div>
	);
}

export default Settings;
