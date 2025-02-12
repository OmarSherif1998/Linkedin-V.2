/** @format */

import React from 'react';
import SettingsForm from './SettingsForm';
import {
	ActivityInferredData,
	ProfileData,
	ThirdPartyData,
} from '../../staticData/SettingsData';

function AdvertisingData() {
	return (
		<div className='flex flex-col w-full gap-5 h-fit '>
			<SettingsForm StaticDate={ProfileData} title={'Profile data'} />
			<SettingsForm
				StaticDate={ActivityInferredData}
				title={'Activity and inferred data'}
			/>
			<SettingsForm StaticDate={ThirdPartyData} title={'Third-party data'} />
		</div>
	);
}

export default AdvertisingData;
