/** @format */

import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ConnectButton({ Connection }) {
	return (
		<aside className='ml-auto'>
			<button
				onClick={Connection}
				className='flex items-center gap-2 font-medium text-blue-500 cursor-pointer hover:text-postButtonColor group hover:bg-blue-100 hover:bg-opacity-50 hover:rounded-xl px-[0.5rem]'
			>
				<PersonAddIcon className='text-blue-500 group-hover:text-postButtonColor' />
				<span className='group-hover:text-postButtonColor'>Connect</span>
			</button>
		</aside>
	);
}

export default ConnectButton;
