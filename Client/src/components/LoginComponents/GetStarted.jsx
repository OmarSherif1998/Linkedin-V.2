/** @format */

import React from 'react';

function GetStarted() {
	return (
		<div className="flex flex-col items-start gap-[1.25rem] w-full h-[34.375rem] 2xl:h-[43.75rem] bg-[url('../images/wallpaper.jpg')] bg-contain mt-[0.625rem] py-[4rem] 2xl:py-[5rem] px-[2.5rem] md:px-[5rem] lg:px-[10rem]">
			<h1 className='font-light text-[2.25rem] 2xl:text-[3.125rem] leading-tight max-w-[50rem] 2xl:max-w-[68.75rem]'>
				Join your colleagues, classmates, and friends on LinkedIn.
			</h1>
			<button className='w-[10.3125rem] h-[3.125rem] text-lg text-white bg-[#0a66c2] rounded-full'>
				Get started
			</button>
		</div>
	);
}

export default GetStarted;
