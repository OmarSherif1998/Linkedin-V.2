/** @format */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SettingsForm from './SettingsForm';
import { getSigninSecurityData } from '../../staticData/SettingsData';
import PasswordReset from './PasswordReset';

function SigninSecurity({ user, formWidth }) {
	const signinSecurityData = getSigninSecurityData(user);
	const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get('password') === 'true') {
			setIsPasswordFormOpen(true);
		}
	}, [searchParams]);

	const handlePasswordChange = () => {
		setSearchParams({ section: 'Sign in & security' });
		setIsPasswordFormOpen((prev) => !prev);
	};

	return (
		<div className={`flex flex-col gap-5 ${formWidth} h-fit`}>
			{isPasswordFormOpen ? (
				<PasswordReset
					handlePasswordChange={handlePasswordChange}
					formWidth={formWidth}
					user={user}
				/>
			) : (
				<SettingsForm
					StaticDate={signinSecurityData}
					title={'Account Access'}
					handlePasswordChange={() =>
						setSearchParams({ section: 'Sign in & security', password: 'true' })
					}
				/>
			)}
		</div>
	);
}

export default SigninSecurity;
