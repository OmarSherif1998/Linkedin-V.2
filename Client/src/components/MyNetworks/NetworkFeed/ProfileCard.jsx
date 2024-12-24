/** @format */

import React from 'react';
import profile from '../../../images/google.png';
function ProfileCard() {
	return (
		<div className='flex flex-col border-2 w-[15rem] h-[10rem] hover:'>
			<section className='relative'>
				{/* Cover Picture */}
				<img
					src={profile}
					alt='Cover'
					className='object-cover w-full h-[3rem] border'
				/>

				{/* Profile Picture positioned over the cover pic */}
				<img
					src={profile}
					alt='Profile'
					className='w-[3rem] h-[3rem] rounded-full object-cover absolute -bottom-[1rem] left-5 border border-white'
				/>
			</section>
			<section className='p-4'>
				<h1>Name</h1>
				<p className='font-thin text-gray-400'>Bio</p>
			</section>
			<section className='flex items-center justify-center px-3'>
				<button className='w-full border rounded-full text-LinkedInBlue border-LinkedInBlue hover:bg-gray-100 '>
					Follow
				</button>
			</section>
		</div>
	);
}

export default ProfileCard;
