/** @format */

import React from 'react';
import Column from './Column';
import { column6, column7, column8 } from '../../../staticData/footerData';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';

const FooterOptions = ({ Icon, title, subtitle }) => (
	<div className='flex items-center gap-1'>
		<Icon className='text-gray-700' fontSize='small' />
		<section className='flex flex-col'>
			<h1 className='text-sm font-semibold hover:text-LinkedInBlue hover:cursor-pointer hover:underline'>
				{title}
			</h1>
			<span className='text-[10px] opacity-45 '>{subtitle}</span>
		</section>
	</div>
);

function ProfileFooter() {
	return (
		<div className='flex gap-[5rem] mt-20 pt-4'>
			<Column colData={column6} />
			<Column colData={column7} />
			<Column colData={column8} />
			<section>
				<FooterOptions
					Icon={HelpIcon}
					title={'Question?'}
					subtitle={'Visit our Help Center.'}
				/>
				<FooterOptions
					Icon={SettingsIcon}
					title={'Manage your account and privacy'}
					subtitle={'Go to your Settings.'}
				/>
				<FooterOptions
					Icon={ShieldIcon}
					title={'Recommendation transparency'}
					subtitle={'Learn more about Recommended Content.'}
				/>
			</section>
		</div>
	);
}

export default ProfileFooter;
