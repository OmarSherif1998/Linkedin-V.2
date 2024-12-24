/** @format */

import React from 'react';

function IncomingMessage({ idx, message, user }) {
	return (
		<div className='flex items-center gap-1 mb-2'>
			<p
				className='px-3 py-1 ml-auto text-white bg-blue-600 rounded-br-none rounded-xl '
				key={idx}
			>
				{message}
			</p>{' '}
			<img
				src={user.profilePicture}
				alt=''
				className='w-8 h-8 mr-2 rounded-full'
			/>
		</div>
	);
}

export default IncomingMessage;
