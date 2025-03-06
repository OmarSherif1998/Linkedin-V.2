/** @format */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { login, logout, selectUser } from '../Redux/sllices/userSlice.js';
import { fetchMyData } from '../api/userAPI.js';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import MyNetwork from './MyNetwork.jsx';
import UserProfile from './UserProfile.jsx';
import LandingPage from './LandingPage.jsx';
import LoadingScreen from '../components/util/LoadingScreen.jsx';
import Header from '../components/util/Header.jsx';
import Settings from './Settings.jsx';
import useLoading from '../hooks/useLoading.js';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const { loading, setLoading } = useLoading();
	const [isExpired, setIsExpired] = useState(false);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(logout());
		setIsExpired(true);
		navigate('/login');
	};

	useEffect(() => {
		const checkAuth = async () => {
			setLoading(true);

			const token = localStorage.getItem('token');
			const currentPath = window.location.pathname;

			// Allow users to access signup without checking auth
			if (currentPath === '/signup') {
				setLoading(false);
				return;
			}

			if (!token) {
				handleLogout();
				setLoading(false);
				return;
			}

			try {
				const userData = await fetchMyData(token);
				if (userData) {
					dispatch(login(userData));
				} else {
					handleLogout();
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				handleLogout();
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
