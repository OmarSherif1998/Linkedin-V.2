/** @format */

import React from 'react';
import SettingsForm from './SettingsForm';
import { getSigninSecurityData } from '../../staticData/SettingsData';
function SigninSecurity({ user }) {
	const signinSecurityData = getSigninSecurityData(user);

	return (
		<div className='flex flex-col w-full gap-5 h-fit '>
			<SettingsForm StaticDate={signinSecurityData} title={'Account Access'} />
		</div>
	);
}

export default SigninSecurity;
