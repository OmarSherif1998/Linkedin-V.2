/** @format */

import React from 'react';

function PendingButton() {
	return (
		<aside className='ml-auto'>
			<button className='font-medium cursor-default bg-transparent border border-gray-400 text-gray-500 hover:bg-gray-200 rounded-full px-4 py-1.5'>
				<span className=''>Pending</span>
			</button>
		</aside>
	);
}

export default PendingButton;
