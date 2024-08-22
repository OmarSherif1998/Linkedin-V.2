/** @format */

import React from 'react';

function Internship() {
	const buttonData = [
		'Engineering',
		'Bussiness Development',
		'Finance',
		'Adminstative Assistant',
		'Retail Associate',
		'Customer Service',
		'Operations',
		'Information technology',
		'Marketing',
		'Human Resources',
		'Show more',
	];

	return (
		<div className='flex flex-col py-[10rem] bg-[#f3f2f0] w-full'>
			<div className='text-center font-sans text-[3rem] font-thin text-black mb-[3rem]'>
				<h1>Find the right job or internship for you</h1>
			</div>

			<div className='flex flex-col items-center px-[2.5rem]'>
				<h4 className='font-sans text-[1rem] font-semibold uppercase leading-[1.25] text-black mb-[1.25rem]'>
					Suggested Searches
				</h4>
				<div className='flex flex-wrap gap-[0.5rem]'>
					{buttonData.map((data, index) => (
						<button
							key={index}
							className='h-[3.125rem] text-lg text-black bg-transparent border border-black rounded-full px-[1rem] py-[0.5rem] hover:bg-gray-200 transition-colors duration-300'
						>
							{data}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Internship;
