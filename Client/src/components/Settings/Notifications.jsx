/** @format */

import React from 'react';
import SettingsForm from './SettingsForm';
import { NotificationData } from '../../staticData/SettingsData';

function Notifications() {
	return (
		<div className='flex flex-col w-full gap-5 h-fit '>
			<SettingsForm
				StaticDate={NotificationData}
				title={'Notifications you receive'}
			/>
		</div>
	);
}

export default Notifications;
