/** @format */

import React from 'react';
import logo from '../images/linkedin.png';
import google from '../images/google.png';
import PasswordRequirements from '../components/Sign-up/PasswordRequirements';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { SubColumnList } from '../functions/footerFunctions';
import { column5 } from '../staticData/footerData';
import Warning from '../components/Options/Warning';
import { useHandlers } from '../hooks/useHandlers';
import LoadingScreen from '../components/LoadingScreen';

function SignUp() {
	const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		visible,
		revisible,
		warning,
		loading,
		warningMessage,
		minChar,
		hasLowercase,
		hasUppercase,
		hasNumber,
		hasSpecialChar,
		noWhitespace,
		setFirstName,
		setLasttName,
		setEmail,
		setPassword,
		setConfirmPassword,
		togglePasswordVisibility,
		toggleRePasswordVisibility,
		handleSubmit,
		handleInputChange,
		onClose,
	} = useHandlers();

	return (
		<div className='flex flex-col p-[1rem] w-[100%] gap-10'>
			<img src={logo} alt='logo' className=' w-36' />
			{loading && <LoadingScreen />}
			<div className='flex flex-col items-center justify-center w-full min-h-screen gap-10'>
				<h1 className='text-4xl font-normal text-center'>
					Make the most of your professional life
				</h1>
				<div className='flex flex-col items-center p-8 bg-white rounded border border-gray-400 shadow-2xl w-[33rem]'>
					{warning && <Warning message={warningMessage} onClose={onClose} />}

					<form className='flex flex-col w-full gap-4'>
						<input
							type='text'
							placeholder='First Name'
							value={firstName}
							onChange={handleInputChange(setFirstName)}
							className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							placeholder='Last Name'
							value={lastName}
							onChange={handleInputChange(setLasttName)}
							className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							placeholder='Email'
							value={email}
							onChange={handleInputChange(setEmail)}
							className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<div className='relative'>
							<input
								type={visible ? 'text' : 'password'} // Toggle password visibility
								placeholder='Password'
								value={password}
								onChange={handleInputChange(setPassword)}
								className='w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<span
								className='absolute inset-y-0 flex items-center cursor-pointer right-2'
								onClick={togglePasswordVisibility}
							>
								{!visible ? (
									<VisibilityOffIcon className='text-gray-500' />
								) : (
									<VisibilityIcon className='text-gray-500' />
								)}
							</span>
						</div>
						<div className='relative'>
							<input
								type={revisible ? 'text' : 'password'} // Toggle password visibility
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={handleInputChange(setConfirmPassword)}
								className='w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<span
								className='absolute inset-y-0 flex items-center cursor-pointer right-2'
								onClick={toggleRePasswordVisibility}
							>
								{!revisible ? (
									<VisibilityOffIcon className='text-gray-500' />
								) : (
									<VisibilityIcon className='text-gray-500' />
								)}
							</span>
						</div>
						{password && confirmPassword ? (
							password === confirmPassword ? (
								<span className='text-green-400'>Passwords match</span>
							) : (
								<span className='text-red-600'>Passwords don't match</span>
							)
						) : null}

						<div className='flex flex-col gap-6'>
							<PasswordRequirements
								minChar={minChar}
								hasLowercase={hasLowercase}
								hasUppercase={hasUppercase}
								hasNumber={hasNumber}
								hasSpecialChar={hasSpecialChar}
								noWhitespace={noWhitespace}
							/>
							<div className='flex items-center gap-2'>
								<input type='checkbox' name='Remember Me' id='' />
								<p className='text-sm font-normal'>Remember me</p>
							</div>
							<div className='text-center'>
								<span className='text-sm font-thin'>
									By clicking Agree & Join or Continue, you agree to the
									LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
								</span>
								<button
									onClick={handleSubmit}
									className='w-[29rem] h-[3.5rem] mt-4 text-lg font-semibold text-white bg-LinkedInBlue rounded-full hover:bg-blue-700'
								>
									Agree & Join
								</button>
							</div>
						</div>
					</form>
					<div className='flex flex-col items-center gap-3 '>
						<div className='flex flex-col items-center gap-3'>
							<p className='mt-6 text-lg font-semibold'>or</p>
							<button className='flex items-center justify-center w-[29rem] h-[3.5rem] gap-2 font-semibold text-black border border-black rounded-full hover:bg-gray-100'>
								<img src={google} alt='Google Logo' className='w-10' />
								Sign In with Google
							</button>
						</div>
						<div className='flex items-center gap-1'>
							<p className='text-sm'>Already on LinkedIn?</p>
							<Link to='/'>
								<span className='font-medium text-LinkedInBlue'>Sign in</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				<SubColumnList data={column5} />
			</div>
		</div>
	);
}

export default SignUp;
