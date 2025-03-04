/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { login, logout, selectUser } from '../Redux/sllices/userSlice.js';
import { fetcMyData } from '../api/userAPI.js';
import { useHandlers } from '../hooks/useHandlers.js';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import MyNetwork from './MyNetwork.jsx';
import UserProfile from './UserProfile.jsx';
import LandingPage from './LandingPage.jsx';
import LoadingScreen from '../components/util/LoadingScreen.jsx';
import Header from '../components/util/Header.jsx';
import Settings from './Settings.jsx';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const { loading, setLoading } = useHandlers();
	const [isExpired, setIsExpired] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem('token');
				const currentPath = window.location.pathname;

				// Skip authentication check if the user is on the sign-up page
				if (currentPath === '/signup') {
					setLoading(false);
					return;
				}

				if (token) {
					const userData = await fetcMyData(token);

					if (userData) {
						dispatch(login(userData));
					} else {
						localStorage.removeItem('token');
						dispatch(logout());
						setIsExpired(true);
						navigate('/login');
					}
				} else {
					dispatch(logout());
					localStorage.removeItem('token');
					setIsExpired(true);
					navigate('/login');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				localStorage.removeItem('token');
				setIsExpired(true);
				dispatch(logout());
				navigate('/login');
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, [dispatch, setLoading, navigate]);
	if (loading) return <LoadingScreen />;

	return (
		<div
			className={`flex flex-col items-center min-h-screen w-full ${
				user ? 'bg-BgColor' : 'bg-white'
			}`}
		>
			{!user ? (
				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />
					<Route path='/login' element={<LandingPage />} />
					<Route path='/signup' element={<SignUp />} />
					{isExpired && <Route path='/*' element={<Navigate to='/login' />} />}
				</Routes>
			) : (
				<>
					<Header />
					<Routes>
						<Route path='/' element={<Navigate to='/home' />} />
						<Route path='/home' element={<Home />} />
						<Route path='/profile' element={<UserProfile type='Me' />} />
						<Route
							path='/VisitedProfile'
							element={<UserProfile type='visit' />}
						/>
						<Route path='/Settings' element={<Settings />} />
						<Route path='/MyNetwork' element={<MyNetwork />} />
						<Route path='/login' element={<Navigate to='/home' />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
