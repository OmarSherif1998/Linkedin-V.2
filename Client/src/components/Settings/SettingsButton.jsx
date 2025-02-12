/** @format */

import React from 'react';

function SettingsButton({ label, placeholder, Arrow }) {
	return (
		<div className='flex items-center justify-between h-full px-5 my-3 '>
			{' '}
			<p className='text-black text-opacity-75 hover:underline'> {label}</p>
			<section className='flex items-center gap-3'>
				{placeholder ? (
					<span className='text-black text-opacity-60'>{placeholder}</span>
				) : null}
				<Arrow className='text-gray-500' fontSize={'small'} />
			</section>
		</div>
	);
}

export default SettingsButton;
