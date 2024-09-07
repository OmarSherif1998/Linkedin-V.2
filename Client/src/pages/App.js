/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { login, logout, selectUser } from '../Redux/sllices/userSlice.js';
import { fetchUserData } from '../api/users/userAPI.js';
import { useHandlers } from '../hooks/useHandlers.js';
import SignUp from './SignUp.jsx';
import Profile from './Profile.jsx';
import Header from '../components/Header';
import Home from './Home.jsx';
import LandingPage from './LandingPage.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const { loading, setLoading } = useHandlers();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem('token');

				if (token) {
					const userData = await fetchUserData(token);

					if (userData) {
						dispatch(login(userData));
					} else {
						localStorage.removeItem('token');
						dispatch(logout());
						Navigate('/login');
					}
				} else {
					dispatch(logout());
					localStorage.removeItem('token'); // could cause issue if the token already removed, not sure though
					Navigate('/login');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				localStorage.removeItem('token');

				dispatch(logout());
			} finally {
				setLoading(false); // Stop loading regardless of outcome
			}
		};

		checkAuth();
	}, [dispatch, setLoading]);

	if (loading) return <LoadingScreen />;

	return (
		<div
			className={`flex flex-col items-center min-h-screen ${
				user ? 'bg-BgColor' : 'bg-white'
			}`}
		>
			{!user ? (
				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />
					<Route path='/login' element={<LandingPage />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/*' element={<Navigate to='/login' />} />
				</Routes>
			) : (
				<>
					<Header />
					<Routes>
						<Route path='/' element={<Navigate to='/home' />} />
						<Route path='/home' element={<Home />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/login' element={<Navigate to='/home' />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
