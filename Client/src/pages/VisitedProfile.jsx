/** @format */

import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import Connection from '../components/Home/Connection';
import { useLocation } from 'react-router-dom';
import Highlights from '../components/profile/Highlights';
import About from '../components/profile/About';
import Skills from '../components/profile/Skills';
import Services from '../components/profile/Services';
import Activity from '../components/profile/Activity';
import Education from '../components/profile/Education';
import { getUserByID } from '../api/users/userAPI';
import LoadingScreen from '../components/util/LoadingScreen';

function VisitedProfile() {
	const pageSpcs = {
		title: 'More profiles for you',
	};

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const visitedId = queryParams.get('visitedId');

	const [userDetails, setUserDetails] = useState(null); // Initialize as null
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await getUserByID(visitedId, token);
				setUserDetails(response); // Set user details
			} catch (error) {
				console.error('ProfileCard API ERROR: ', error);
			} finally {
				setLoading(false); // Set loading to false once fetching is complete
			}
		};

		fetchUser();
	}, [visitedId]); // Add visitedId as a dependency

	//console.log(userDetails);

	if (loading) return <LoadingScreen />; // Show loading indicator

	// Render the components once userDetails is available
	return (
		<div className='flex gap-8 px-5 mt-5 '>
			<div className='flex flex-col justify-start gap-5'>
				<ProfileCard type='visit' userDetails={userDetails} />

				<Highlights />
				<About userDetails={userDetails[0]} />
				<Services />
				<Activity userDetails={userDetails[0]} />
				<Education />
				<Skills />
			</div>
			<div className='mt-2 w-[30%]'>
				<Connection pageSpecs={pageSpcs} />
			</div>
		</div>
	);
}

export default VisitedProfile;
