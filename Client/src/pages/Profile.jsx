/** @format */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/sllices/userSlice';
import { getUserByID } from '../api/userAPI';
import ProfileCard from '../components/profile/ProfileCard/ProfileCard';
import Analytics from '../components/profile/Analytics/Analytics';
import ProfileLangURL from '../components/profile/ProfileLangURL';
import Connection from '../components/Home/Connection';
import About from '../components/profile/About';
import Activity from '../components/profile/Activity';
import LoadingScreen from '../components/util/LoadingScreen';
import Experiences from '../components/profile/Experience/Experiences';
import Education from '../components/profile/Education/Education';
function Profile() {
	const pageSpcs = {
		title: ' More profiles for you',
	};

	const user = useSelector(selectUser);
	const [userDetails, setUserDetails] = useState();
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await getUserByID(user._id, token);
				setUserDetails(response); // Set user details
			} catch (error) {
				console.error('VisitedProfile API ERROR: ', error);
			} finally {
				setLoading(false); // Set loading to false once fetching is complete
			}
		};

		fetchUser();
	}, []); // Add visitedId as a dependency
	if (loading) return <LoadingScreen />; // Show loading indicator

	return (
		<div className={'flex flex-col gap-[1rem] px-28 '}>
			<div className='flex gap-[2rem] h-fit'>
				<div className='flex flex-col h-fit gap-[1rem]'>
					<ProfileCard type='Me' />
					<Analytics />
					<About userDetails={userDetails} />
					<Activity userDetails={userDetails} />
					<Experiences userDetails={userDetails} />
					<Education userDetails={userDetails} />
				</div>

				<div className='flex flex-col gap-5 w-[35%]'>
					<ProfileLangURL />
					<div className=''>
						<Connection pageSpecs={pageSpcs} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
