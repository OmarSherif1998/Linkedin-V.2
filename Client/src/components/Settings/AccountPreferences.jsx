/** @format */

import React from 'react';
import SettingsButton from './SettingsButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function AccountPreferences({ user }) {
	const buttonData = [
		{ label: 'Email addresess', placeholder: user.email },
		{ label: 'Phone numbers', placeholder: user.phoneNumber },
		{ label: 'Change password', placeholder: '' },
		{ label: 'Pass key', placeholder: '' },
		{ label: 'Where you are signed in', placeholder: '' },
		{
			label: 'devices remember your password',
			placeholder: '',
		},
		{ label: 'Two Step Verification', placeholder: 'Off' },
	];

	return (
		<div className='flex flex-col w-full h-[70%] bg-white rounded-lg '>
			<h1 className='px-5 mt-4 mb-6 text-2xl font-semibold opacity-95'>
				Account access
			</h1>

			{buttonData.map((data, idx) => {
				return (
					<section className='hover:cursor-pointer'>
						{' '}
						<SettingsButton
							label={data.label}
							placeholder={data.placeholder}
							Arrow={ArrowForwardIcon}
						/>
						{buttonData.length > idx ? (
							<div className='w-full border border-t' />
						) : null}
					</section>
				);
			})}
		</div>
	);
}

export default AccountPreferences;
