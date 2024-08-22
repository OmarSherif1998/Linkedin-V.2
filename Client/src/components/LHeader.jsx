/** @format */
import React from 'react';

import Headeroptions from './Headeroptions';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';

function LHeader() {
	return (
		<div className='flex justify-between gap-[1.25rem] p-[1.25rem]'>
			<img
				src={require('../images/linkedin.png')}
				alt=''
				className='h-[2rem] w-[7.25rem]'
			/>

			<div className='flex gap-[1.25rem]'>
				<Headeroptions Icon={NewspaperIcon} title='Articles' />
				<Headeroptions Icon={PeopleAltIcon} title='People' />
				<Headeroptions Icon={SchoolIcon} title='Learning' />
				<Headeroptions Icon={SupervisorAccountIcon} title='Jobs' />

				<button className='lBtn'>Join now</button>
				<button className='border rounded-full w-[7rem] border-LinkedInBlue hover:bg-LinkedInBlue hover:text-white hover:cursor-pointer'>
					Sign In
				</button>
			</div>
		</div>
	);
}

export default LHeader;
