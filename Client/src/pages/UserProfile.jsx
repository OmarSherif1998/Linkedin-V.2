/** @format */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getUserByID } from '../api/userAPI';
import { userTypes } from '../staticData/userTypes.js';
import useUser from '../hooks/useUser';
import ProfileCard from '../components/profile/ProfileCard/ProfileCard';
import Analytics from '../components/profile/Analytics/Analytics';
import ProfileLangURL from '../components/profile/ProfileLangURL';
import Connection from '../components/Home/Connections/Connection.jsx';
import About from '../components/profile/About';
import Activity from '../components/profile/Activity/Activity';
import LoadingScreen from '../components/util/LoadingScreen';
import Education from '../components/profile/Education/Education';
import Experience from '../components/profile/Experience/Experience';
import Skills from '../components/profile/Skills';
import ProfileFooter from '../components/util/ProfilUtil/ProfileFooter';
import useToken from '../hooks/useToken';
function UserProfile({ type }) {
  const pageSpcs = {
    title: 'More profiles for you',
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const visitedId = queryParams.get('visitedId');
  const token = useToken();
  const user = useUser();
  const userId = type === 'Me' ? user._id : visitedId;
  const {
    data: userDetails = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['Users', userId],
    queryFn: () => getUserByID(userId, token, userTypes.FULL_USER),
    enabled: !!userId && !!token,
  });

  const isSelf = userDetails.connectionStatus === 'self';

  if (isLoading) return <LoadingScreen />;
  if (error) return <h1>Error:{error}</h1>;
  return (
    <div className='flex gap-4 md:mt-5 md:px-[18%]'>
      <div className='flex flex-col w-full gap-1 md:gap-4'>
        <ProfileCard userDetails={userDetails} />
        {isSelf && <Analytics />}

        {userDetails.about && (
          <About about={userDetails.about} isSelf={isSelf} />
        )}

        {(userDetails?.posts?.length > 0 ||
          userDetails?.comments?.length > 0) && (
          <Activity
            connectionCount={userDetails.connectionCount}
            username={userDetails.username}
            posts={userDetails.posts}
            comments={userDetails.comments}
          />
        )}

        {userDetails?.experiences?.length > 0 && (
          <Experience experiences={userDetails.experiences} />
        )}

        {userDetails?.education?.length > 0 && (
          <Education userDetails={userDetails} />
        )}

        {userDetails?.skills?.length > 0 && (
          <Skills Skills={userDetails.skills} type={type} />
        )}

        <ProfileFooter />
      </div>

      <div className='flex-col hidden gap-1 shrink-1 w-fit lg:flex'>
        {isSelf && <ProfileLangURL />}

        <Connection pageSpecs={pageSpcs} />
      </div>
    </div>
  );
}

export default UserProfile;
