/** @format */

import { useState } from 'react';

const SquareRadioButton = ({ name, value, onChange, label }) => {
	return (
		<div className='flex items-center'>
			<input
				onClick={() => setChecked(!checked)}
				type='radio'
				id={value}
				name={name}
				value={value}
				checked={checked}
				className='relative w-5 h-5 border-2 border-gray-400 appearance-none checked:bg-green-600 checked:border-gray-400 focus:ring-0'
				style={{ borderRadius: '5px' }} // Removes the default circular shape
			/>
			{checked && <span className='absolute text-white '>✔ </span>}

			<label htmlFor={value} className='ml-2 font-thin'>
				{label}
			</label>
		</div>
	);
};

export default SquareRadioButton;
