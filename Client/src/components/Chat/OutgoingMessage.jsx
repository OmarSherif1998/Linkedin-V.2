/** @format */

import React from 'react';

function OutgoingMessage({ idx, message, user }) {
	return (
		<div className='flex items-center mb-2'>
			<img
				src={user.profilePicture}
				alt=''
				className='w-8 h-8 mr-2 rounded-full'
			/>
			<p
				className='px-3 py-1 bg-gray-200 rounded-bl-none rounded-xl '
				key={idx}
			>
				{message}
			</p>{' '}
		</div>
	);
}

export default OutgoingMessage;
