/** @format */

import React from 'react';

function PasswordReqs({
	minChar,
	hasLowercase,
	hasUppercase,
	hasNumber,
	hasSpecialChar,
	noWhitespace,
	matchedPassword,
}) {
	return (
		<div className='text-left'>
			<h1 className='text-gray-500'>Password Requirements:</h1>
			<ul className='text-sm'>
				<li className={`${minChar ? 'text-green-500' : 'text-red-500'}`}>
					- Minimum 8 characters
				</li>
				<li className={`${hasLowercase ? 'text-green-500' : 'text-red-500'}`}>
					- At least one lowercase letter
				</li>
				<li className={`${hasUppercase ? 'text-green-500' : 'text-red-500'}`}>
					- At least one uppercase letter
				</li>
				<li className={`${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
					- At least one number
				</li>
				<li className={`${hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
					- At least one special character (!@#$%^&* etc.)
				</li>
				<li className={`${noWhitespace ? 'text-green-500' : 'text-red-500'}`}>
					- No spaces allowed
				</li>
				<li
					className={`${matchedPassword ? 'text-green-500' : 'text-red-500'}`}
				>
					- Passwords must match
				</li>
			</ul>
		</div>
	);
}

export default PasswordReqs;
