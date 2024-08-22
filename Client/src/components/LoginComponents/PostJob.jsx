/** @format */

import React from 'react';

const PostJob = () => {
	return (
		<div className='flex flex-col items-center py-[15rem] bg-[#f1ece5] w-full'>
			<h1 className='font-sans text-[2.5rem] font-normal text-CrimsonRed mb-[2rem] text-center w-[80%]'>
				Post your job for millions of people to see
			</h1>
			<button className='w-[8rem] text-xl transition-colors duration-300 border rounded-full h-[3.5rem] text-CrimsonRed border-CrimsonRed hover:bg-CrimsonRed hover:text-white'>
				Post a Job
			</button>
		</div>
	);
};

export default PostJob;
