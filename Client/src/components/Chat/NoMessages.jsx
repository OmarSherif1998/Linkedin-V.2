/** @format */

import React from 'react';
import noMessage from '../../images/noMessage.svg';
function NoMessages() {
	return (
		<div className='flex flex-col items-center gap-5 p-1'>
			<section className='flex flex-col items-center gap-2'>
				<img
					src={noMessage}
					alt=''
					className='object-contain h-[7rem] w-[7rem] '
				/>
				<h1 className='text-2xl'>No messages yet</h1>
			</section>
			<section className='flex flex-col items-center gap-2 mb-[5rem] text-center'>
				<h2>Reach out and start a conversation to advance your career</h2>
				<button className='px-5 text-lg font-thin border border-black rounded-full w-fit hover:bg-gray-200 hover:font-normal'>
					Send a message
				</button>
			</section>
		</div>
	);
}

export default NoMessages;
