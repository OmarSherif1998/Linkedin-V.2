/** @format */

import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function PasswordInput({ value = '', updateValue, label }) {
	const [isPassword, setIsPassword] = useState(true);
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm text-gray-500'>
				{label} <span className='text-red-500'>*</span>
			</label>
			<section className='flex items-center gap-3 '>
				<input
					name='password'
					className='p-1 bg-white border border-gray-300 rounded-lg '
					required={true}
					type={isPassword ? 'password' : 'text'}
					value={value}
					onChange={updateValue}
				/>
				{isPassword ? (
					<VisibilityIcon
						sx={{ color: 'gray' }}
						className='cursor-pointer'
						onClick={() => setIsPassword((prev) => !prev)}
					/>
				) : (
					<VisibilityOffIcon
						sx={{ color: 'gray' }}
						className='cursor-pointer'
						onClick={() => setIsPassword((prev) => !prev)}
					/>
				)}
			</section>
		</div>
	);
}

export default PasswordInput;
