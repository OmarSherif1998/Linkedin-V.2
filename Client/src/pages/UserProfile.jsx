/** @format */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectUser } from '../Redux/sllices/userSlice';
import { getUserByID } from '../api/userAPI';
import ProfileCard from '../components/profile/ProfileCard/ProfileCard';
import Analytics from '../components/profile/Analytics/Analytics';
import ProfileLangURL from '../components/profile/ProfileLangURL';
import Connection from '../components/Home/Connection';
import About from '../components/profile/About';
import Activity from '../components/profile/Activity/Activity';
import LoadingScreen from '../components/util/LoadingScreen';
import Education from '../components/profile/Education/Education';
import Experience from '../components/profile/Experience/Experience';
import Skills from '../components/profile/Skills';
import ProfileFooter from '../components/util/ProfilUtil/ProfileFooter';
import useLoading from '../hooks/useLoading';

function UserProfile({ type }) {
	const pageSpcs = {
		title: 'More profiles for you',
	};

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const visitedId = queryParams.get('visitedId');

	const user = useSelector(selectUser);
	const [userDetails, setUserDetails] = useState(null);
	const { loading, setLoading } = useLoading();
	console.log(userDetails);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const userId = type === 'Me' ? user._id : visitedId;
				const response = await getUserByID(userId, token);
				setUserDetails(response);
			} catch (error) {
				console.error('UserProfile API ERROR: ', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [type, visitedId, user._id]);

	if (loading) return <LoadingScreen />;
	return (
		<div className='flex mt-5 gap-4 px-[5rem] '>
			<div className='flex flex-col gap-4 '>
				<ProfileCard type={type} userDetails={userDetails} />
				{type === 'Me' && <Analytics />}
				{/* <About userDetails={userDetails} />
				<Activity userDetails={userDetails} />
				<Experience userDetails={userDetails} />
				<Education userDetails={userDetails} />
				<Skills />
				<ProfileFooter /> */}

				{userDetails?.about !== '' ? <About userDetails={userDetails} /> : null}
				{userDetails?.posts.length > 0 ? (
					<Activity userDetails={userDetails} />
				) : null}
				{userDetails?.experiences.length > 0 ? (
					<Experience userDetails={userDetails} />
				) : null}
				{userDetails?.education.length > 0 ? (
					<Education userDetails={userDetails} />
				) : null}

				{userDetails?.skills.length > 0 ? <Skills /> : null}

				<ProfileFooter />
			</div>
			<div className=' gap-[1rem] w-fit hidden  lg:flex flex-col '>
				<ProfileLangURL />
				<Connection pageSpecs={pageSpcs} />
			</div>
		</div>
	);
}

export default UserProfile;
