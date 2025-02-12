/** @format */
import React, { useState } from 'react';
import { login } from '../../Redux/sllices/userSlice';
import { useDispatch } from 'react-redux';
import { authenticateUser, fetcMyData } from '../../api/userAPI.js';
import { useNavigate } from 'react-router-dom';
import { useHandlers } from '../../hooks/useHandlers';
function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loading, setLoading } = useHandlers();
	const [invalidCredentials, setInvalidCredentials] = useState(undefined);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginToApp = async (e) => {
		e.preventDefault();

		try {
			const token = await authenticateUser({ email, password });

			if (token) {
				localStorage.setItem('token', token);
				const userData = await fetcMyData(token);

				dispatch(login(userData));
				console.log('CLIENT: LOGIN PAGE SUCCESSFULLY LOGGED IN');

				// Delay navigation to ensure loading screen is visible
				setTimeout(() => {
					navigate('/');
					setLoading(false); // Stop loading after navigation
				}, 10); // Adjust timeout duration if needed
			} else {
				setInvalidCredentials(null);
			}
		} catch (error) {
			console.log('CLIENT: LOGIN PAGE ERROR: ', error);
			setLoading(false); // Stop loading in case of an error
		}
	};

	return (
		<div className='flex justify-center gap-[5rem] p-[2rem]'>
			<div className='flex flex-col'>
				<h1 className='font-sans font-thin text-[2.5rem] text-[#8f5849] w-[80%] pb-[2rem]'>
					Welcome to your professional community
				</h1>
				<form className='flex flex-col mb-[1.25rem]'>
					<input
						type='email'
						value={email}
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='E-mail'
						className='w-[25rem] h-[2.8125rem] text-lg pl-[1rem] mb-[1rem] rounded-md border border-black'
					/>
					<input
						type='password'
						value={password}
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						className='w-[25rem] h-[2.8125rem] text-lg pl-[1rem] mb-[1rem] rounded-md border border-black'
					/>
					{invalidCredentials === null ? (
						<span className='px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md w-fit bg-red-50'>
							The password or username that you have entered is incorrect.
						</span>
					) : null}
				</form>
				<button
					type='submit'
					onClick={(e) => {
						setLoading(true);
						loginToApp(e);
					}}
					className='w-[25rem] h-[2.8125rem] text-lg text-white bg-LinkedInBlue rounded-full hover:bg-LinkedInDarkBlue'
				>
					Sign in
				</button>
				<div className='flex items-center justify-start gap-[0.5rem] my-[1rem] lg:justify-center'>
					<div className='w-1/4 border-t border-gray-300 lg:w-1/3'></div>
					<span>or</span>
					<div className='w-1/4 border-t border-gray-300 lg:w-1/3'></div>
				</div>
				<div className='flex flex-col gap-[1rem]'>
					<button className='w-[25rem] h-[2.8125rem] text-lg text-black border border-black bg-white rounded-full hover:bg-gray-100'>
						Sign in with Google
					</button>
					<button
						className='w-[25rem] h-[2.8125rem] text-lg text-black border border-black bg-white rounded-full hover:bg-gray-100'
						onClick={loginToApp}
					>
						New to LinkedIn? Join now
					</button>
				</div>
			</div>
			<img
				src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'
				alt='LinkedIn Logo'
				className='hidden md:block w-[43.75rem]'
			/>
		</div>
	);
}

export default LoginForm;
