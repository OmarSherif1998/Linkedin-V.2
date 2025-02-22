/** @format */

import React from 'react';
import SettingsForm from './SettingsForm';
import {
	AccountManagement,
	Display,
	GeneralPreferences,
	ProfileInformationData,
	SubscriptionsPayments,
	SyncingOptions,
} from '../../staticData/SettingsData';

function AccountPreferences() {
	return (
		<div className='flex flex-col w-full gap-5 h-fit '>
			<SettingsForm
				StaticDate={ProfileInformationData}
				title={'Profile Information Data'}
			/>
			<SettingsForm StaticDate={Display} title={'Display'} />
			<SettingsForm
				StaticDate={GeneralPreferences}
				title={'General Preferences'}
			/>
			<SettingsForm StaticDate={SyncingOptions} title={'Syncing Options'} />
			<SettingsForm
				StaticDate={SubscriptionsPayments}
				title={'Subscriptions and Payments'}
			/>
			<SettingsForm
				StaticDate={AccountManagement}
				title={'Account Management'}
			/>
		</div>
	);
}

export default AccountPreferences;
