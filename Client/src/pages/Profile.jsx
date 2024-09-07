/** @format */

import React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import Analytics from '../components/profile/Analytics';
import ProfileLangURL from '../components/profile/ProfileLangURL';
import Connection from '../components/Home/Connection';

function Profile() {
	const pageSpcs = {
		width: '85%',
		title: ' More profiles for you',
	};
	return (
		<div className='flex flex-col gap-[1rem] px-5'>
			<div className='flex gap-[2rem]'>
				<div className='flex flex-col'></div>

				<div className='h-[fit] w-[99%]  '>
					<ProfileCard />
				</div>

				<div className='flex flex-col gap-5'>
					<ProfileLangURL />
					<Connection pageSpecs={pageSpcs} />
				</div>
			</div>
			<Analytics />
		</div>
	);
}

export default Profile;
