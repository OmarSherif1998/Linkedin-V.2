/** @format */

import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function OpenTo() {
	return (
		<div className='flex flex-col bg-OpenToWork rounded-md w-[89%] h-[5rem] ml-[1.5rem] p-3'>
			<div className='flex mt-[0.5rem]'>
				<h1 className='text-sm font-semibold'>Open to work</h1>
				<button className='ml-auto'>
					<EditOutlinedIcon fontSize='sm' />
				</button>
			</div>
			<p>This is a placeholder for your open to work section.</p>
		</div>
	);
}

export default OpenTo;
