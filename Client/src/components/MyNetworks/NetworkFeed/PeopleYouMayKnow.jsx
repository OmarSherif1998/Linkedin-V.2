/** @format */

import React from 'react';
import ProfileCard from './ProfileCard';

function PeopleYouMayKnow() {
	return (
		<div className='flex flex-col gap-5 p-5 bg-white rounded-lg shadow-lg h-fit'>
			<header className='flex items-center justify-between px-2'>
				<h1>People you may know from The British University in Egypt</h1>
				<button className='p-1 font-semibold rounded-lg hover:bg-gray-100'>
					See all
				</button>
			</header>
			<section className='grid grid-cols-3 gap-3'>
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
				<ProfileCard />
			</section>
		</div>
	);
}

export default PeopleYouMayKnow;
