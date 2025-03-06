/** @format */

import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import PasswordInput from '../util/ResetPasswordUtil/PasswordInput';
import SquareRadioButton from '../util/FormsUtil/SquareRadioButton';
import { updateUserPassword } from '../../api/userAPI';
import { useSignUp } from '../../hooks/useSignUp';
function PasswordReset({ formWidth, user }) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState(false);

	const {
		validatePassword,
		minChar,
		hasLowercase,
		hasUppercase,
		hasNumber,
		hasSpecialChar,
		noWhitespace,
		matchedPassword,
	} = useSignUp();
	useEffect(() => {
		const isValidated = validatePassword(newPassword, confirmPassword);
		if (isValidated) {
			setError(false);
		}
	}, [newPassword, confirmPassword]);

	const submitPassword = async () => {
		if (validatePassword(newPassword, confirmPassword)) {
			const response = updateUserPassword(
				currentPassword,
				newPassword,
				user._id,
			);
			console.log(response);
		} else {
			setError(true);
		}
	};

	const onPasswordChange = (value, type) => {
		if (type === 'new') {
			setNewPassword(value);
		} else {
			setConfirmPassword(value);
		}
	};

	return (
		<div
			className={`flex flex-col gap-5 ${formWidth} h-fit bg-white p-5 rounded-t-lg`}
		>
			<nav className='flex items-end text-sm font-semibold text-gray-500'>
				<ArrowBackIcon fontSize='small' />
				<button>Back</button>
			</nav>
			<div>
				<p className='font-semibold'>Change password</p>
				<span className='text-sm font-thin'>
					Create a new password that is at least 8 characters long.
				</span>
			</div>
			<button className='flex items-center gap-2 px-5 py-2 font-semibold rounded-full hover:bg-blue-100 w-fit text-LinkedInBlue hover:text-blue-900'>
				<SecurityIcon fontSize='small' /> What makes a strong password?{' '}
			</button>
			<section className='flex justify-around '>
				<form autoComplete='off' className='w-[40%]'>
					<PasswordInput
						label='Type your current password'
						value={currentPassword}
						updateValue={(e) => setCurrentPassword(e.target.value)}
					/>
					<PasswordInput
						label='Type your new password'
						value={newPassword}
						updateValue={(e) => onPasswordChange(e.target.value, 'new')}
					/>
					<PasswordInput
						label='Retype your new password'
						value={confirmPassword}
						updateValue={(e) => onPasswordChange(e.target.value, 'confirm')}
					/>
				</form>
				<div className='text-left'>
					<h1 className='text-gray-500'>Password Requirements:</h1>
					<ul className='text-sm'>
						<li className={`${minChar ? 'text-green-500' : 'text-red-500'}`}>
							- Minimum 8 characters
						</li>
						<li
							className={`${hasLowercase ? 'text-green-500' : 'text-red-500'}`}
						>
							- At least one lowercase letter
						</li>
						<li
							className={`${hasUppercase ? 'text-green-500' : 'text-red-500'}`}
						>
							- At least one uppercase letter
						</li>
						<li className={`${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
							- At least one number
						</li>
						<li
							className={`${
								hasSpecialChar ? 'text-green-500' : 'text-red-500'
							}`}
						>
							- At least one special character (!@#$%^&* etc.)
						</li>
						<li
							className={`${noWhitespace ? 'text-green-500' : 'text-red-500'}`}
						>
							- No spaces allowed
						</li>
						<li
							className={`${
								matchedPassword ? 'text-green-500' : 'text-red-500'
							}`}
						>
							- Passwords must match
						</li>
					</ul>
				</div>
			</section>
			{error ? (
				<span className='text-sm text-red-500'>
					Password does not meet all requirements
				</span>
			) : null}
			<section className='flex items-center justify-between'>
				<SquareRadioButton
					checked={checked}
					setChecked={setChecked}
					label={'Require all devices to sign in with new password'}
				/>
				<button
					onClick={submitPassword}
					className='px-5 py-2 ml-auto text-white rounded-full bg-likeColor w-fit hover:bg-LinkedInBlue '
				>
					Save Password
				</button>
			</section>
		</div>
	);
}

export default PasswordReset;
