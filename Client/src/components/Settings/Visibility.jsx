/** @format */

import React from 'react';
import SettingsForm from './SettingsForm';
import {
	VisibilityLinkedInActivity,
	VisibilityProfileNetwork,
} from '../../staticData/SettingsData';

function Visibility() {
	return (
		<div>
			<div className='flex flex-col w-full gap-5 h-fit'>
				<SettingsForm
					StaticDate={VisibilityProfileNetwork}
					title={'Visibility of your profile & network'}
				/>
				<SettingsForm
					StaticDate={VisibilityLinkedInActivity}
					title={'Visibility of your LinkedIn activity'}
				/>
			</div>
		</div>
	);
}

export default Visibility;
