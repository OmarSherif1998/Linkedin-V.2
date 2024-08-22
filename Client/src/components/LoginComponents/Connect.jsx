/** @format */

import React, { useState } from 'react';
import desk from '../../images/desk.png';
import couch from '../../images/couch.png';
function Connect() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className='flex flex-wrap items-center py-[2.5rem] bg-gray-200 justify-evenly'>
			<div className='flex flex-col flex-wrap gap-[1.5rem]'>
				<img src={couch} alt='couch.png' className='w-[21.875rem]' />
				<h1 className='font-sans font-normal w-[95%] text-[1.5625rem]'>
					Connect with people who can help
				</h1>
				<button className='h-[3.125rem] text-lg border border-black rounded-[1.5625rem] px-[0.9375rem] w-[70%] hover:bg-light-gray hover:opacity-[0.8]'>
					Find people you know
				</button>
			</div>

			<div className='flex flex-col flex-wrap gap-[1.5rem]'>
				<img src={desk} alt='desk.png' />
				<h1 className='font-sans font-normal w-[75%] text-[1.5625rem]'>
					Learn the skills you need to succeed
				</h1>
				<div className='relative inline-block'>
					<button
						className='h-[3.125rem] text-lg border border-black rounded-[1.5625rem] px-[0.9375rem] w-[80%] hover:bg-light-gray hover:opacity-[0.8]'
						onClick={toggleDropdown}
					>
						Choose a topic to learn about
					</button>
					{isOpen && (
						<div className='absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg'>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>
								Business Analysis and Strategy
							</p>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>
								Business Software and Tools
							</p>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>
								Career Development
							</p>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>Web Design</p>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>
								Network and System Administration
							</p>
							<p className='p-4 cursor-pointer hover:bg-gray-100'>
								Motion Graphics and VFX
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Connect;
