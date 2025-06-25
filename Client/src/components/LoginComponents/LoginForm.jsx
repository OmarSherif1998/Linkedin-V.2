/** @format */
import React, { useState } from 'react';
import { login } from '../../Redux/sllices/userSlice';
import { useDispatch } from 'react-redux';
import { authenticateUser, fetchMyData } from '../../api/userAPI.js';
import useNavigation from '../../hooks/useNavigation.js';
import Divider from './Divider.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../util/LoadingSpinner.jsx';
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(undefined);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const dispatch = useDispatch();
  const { NavigateToHome } = useNavigation();

  const loginToApp = async (e) => {
    e.preventDefault();

    try {
      setIsInputDisabled(true);
      const token = await authenticateUser({ email, password });

      if (token) {
        localStorage.setItem('token', token);
        const userData = await fetchMyData(token);
        dispatch(login(userData));
        console.log('CLIENT: LOGIN PAGE SUCCESSFULLY LOGGED IN');
        NavigateToHome();
      } else {
        setIsInputDisabled(false);

        setInvalidCredentials(null);
      }
    } catch (error) {
      console.log('CLIENT: LOGIN PAGE ERROR: ', error);
    }
  };
  return (
    <div className='flex flex-col justify-center gap-10 p-8 md:flex-row md:gap-20'>
      <div className='flex flex-col items-center md:items-start'>
        <h1 className='pb-8 text-center font-sans text-3xl text-gray-600 md:text-left md:text-4xl md:font-thin md:text-[#8f5849] xl:w-[85%]'>
          Welcome to your professional community
        </h1>
        <form className='mb-5 flex flex-col items-center md:items-start'>
          <input
            disabled={isInputDisabled}
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail'
            className='mb-4 h-11 w-80 rounded-md border border-black pl-4 md:w-96 md:text-lg'
          />
          <input
            disabled={isInputDisabled}
            type='password'
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='mb-4 h-11 w-80 rounded-md border border-black pl-4 md:w-96 md:text-lg'
          />
          <div className='mb-4 flex w-80 justify-between md:w-96'>
            <button
              type='button'
              className='text-sm text-LinkedInBlue hover:underline'
              onClick={() => {
                navigate('/forgetPassword');
              }}
            >
              Forgot password?
            </button>
          </div>
          {invalidCredentials === null && (
            <span className='w-[90%] rounded-md border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 md:w-fit md:text-sm'>
              The password or username that you've entered is incorrect.
            </span>
          )}
        </form>
        <button
          type='submit'
          onClick={(e) => {
            loginToApp(e);
          }}
          className='hover:bg-LinkedInDarkBlue h-11 w-80 rounded-full bg-LinkedInBlue text-lg text-white md:w-96'
        >
          {isInputDisabled ? <LoadingSpinner /> : '  Sign in '}
        </button>

        <Divider />

        <div className='flex flex-col items-center gap-4 md:items-start'>
          <button
            disabled={isInputDisabled}
            className='h-11 w-80 rounded-full border border-black bg-white text-lg text-black hover:bg-gray-100 md:w-96'
          >
            Sign in with Google
          </button>
          <button
            disabled={isInputDisabled}
            className='h-11 w-80 rounded-full border border-black bg-white text-lg text-black hover:bg-gray-100 md:w-96'
            onClick={loginToApp}
          >
            New to LinkedIn? Join now
          </button>
        </div>
      </div>
      <img
        src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'
        alt='LinkedIn Logo'
        className='hidden md:block md:w-[600px]'
      />
    </div>
  );
}

export default LoginForm;
