/** @format */

import React, { useEffect, useState } from 'react';
function Form() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const register = (e) => {
		e.preventDefault();
		if (!name) {
			return alert('Please enter your name');
		}
	};
	const loginToApp = (e) => {
		e.preventDefault();
	};

	useEffect(() => {}, []);

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
						onChange={(e) => setEmail(e.target.value)}
						placeholder='E-mail'
						className='w-[25rem] h-[2.8125rem] text-lg pl-[1rem] mb-[1rem] rounded-md border border-black'
					/>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						className='w-[25rem] h-[2.8125rem] text-lg pl-[1rem] mb-[1rem] rounded-md border border-black'
					/>
				</form>
				<button
					type='button'
					onClick={loginToApp}
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
					<button className='w-[25rem] h-[2.8125rem] text-lg text-black border border-black bg-white rounded-full hover:bg-gray-100'>
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

export default Form;
