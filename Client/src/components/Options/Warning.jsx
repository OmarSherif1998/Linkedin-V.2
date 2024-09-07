/** @format */

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Warning({ message, onClose }) {
	return (
		<div className='flex flex-col w-[23rem] h-[16rem] bg-white shadow-lg rounded-lg border border-gray-300 p-4'>
			<div className='flex items-center justify-between pb-2 border-b'>
				<h2 className='text-lg font-semibold text-gray-700'>Warning</h2>
				<button
					onClick={onClose}
					className='p-1 transition duration-200 rounded-full hover:bg-red-100'
				>
					<CloseIcon sx={{ color: 'red' }} />
				</button>
			</div>
			<div className='flex items-center justify-center flex-grow text-center'>
				<p className='text-sm text-gray-600'>{message || 'Warning!'}</p>
			</div>
			<button
				onClick={onClose}
				className='self-center px-6 py-2 mt-4 text-white transition duration-200 bg-red-500 rounded-full shadow hover:bg-red-600'
			>
				OKAY
			</button>
		</div>
	);
}

export default Warning;
