import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useServerConnection } from '../hooks/useServerConnection';
import { setDarkMode } from '../Redux/sllices/themeSlice';
import { useDispatch } from 'react-redux';
import useUser from '../hooks/useUser';
import MobileSidebar from '../components/util/MobileSidebar/MobileSidebar';
import Home from '../pages/Home';
import MyNetwork from '../pages/MyNetwork';
import UserProfile from '../pages/UserProfile';
import Settings from '../pages/Settings';
import Header from '../components/util/Header';
import MobileHeader from '../components/util/MobileHeader';
import MobileFooter from '../components/util/MobileFooter';
import MobilePostForm from '../components/post/MobilePostForm.jsx';
import Messaging from '../pages/Messaging';
import AccountPreferences from '../components/Settings/Sections/AccountPreferences';
import SigninSecurity from '../components/Settings/Sections/SigninSecurity';
import PasswordReset from '../components/Settings/passowrdForm/PasswordReset';
import Visibility from '../components/Settings/Sections/Visibility';
import DataPrivacy from '../components/Settings/Sections/DataPrivacy';
import AdvertisingData from '../components/Settings/Sections/AdvertisingData';
import Notifications from '../components/Settings/Sections/Notifications';
import AccountVerificationPage from '../pages/AccountVerificationPage';
import DarkMode from '../components/Settings/DarkMode';
import CompanyProfile from '../pages/CompanyProfile';
import Jobs from '../pages/Jobs';
import JobsCollection from '../pages/JobsCollection';
import ChatModal from '../components/Messaging/ChatModal';
import useConnectionRequests from '../hooks/useConnectionRequests.js';
import useScreenSize from '../hooks/useScreenSize.js';
import UniversityProfile from '../pages/UniversityProfile.js';
import SearchResults from '../pages/SearchResults.jsx';

function AuthenticatedRoutes({ profilePicture, _id }) {
  const user = useUser();
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;

  const { isMobile } = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [mobileActiveChat, setMobileActiveChat] = useState({
    isActive: false,
    friendID: null,
  });

  useServerConnection({
    userID: user?._id,
    chats: user?.chatParticipants,
  });

  const { data: pendingRequests, isLoading } = useConnectionRequests(_id);
  useEffect(() => {
    if (user?.darkMode !== undefined) {
      dispatch(setDarkMode(user.darkMode));
    }
  }, [user?.darkMode, dispatch]);
  return (
    <div className='relative min-h-screen w-full md:pb-14'>
      {path.startsWith('/Jobs/Collection') ? null : (
        <div className='hidden lg:block'>
          <Header />
        </div>
      )}
      {path !== '/Messaging' ? (
        <div
          className={`sticky top-0 z-50 block ${path.startsWith('/Settings') ? 'hidden' : ''} lg:hidden`}
        >
          <MobileHeader
            profilePicture={profilePicture}
            _id={_id}
            onProfileClick={() => setIsSidebarOpen(true)}
          />
        </div>
      ) : null}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className='w-full overflow-hidden pb-12'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<UserProfile type='Me' />} />
          <Route path='/search/:searchParam' element={<SearchResults />} />

          <Route
            path='/VisitedProfile'
            element={<UserProfile type='visit' />}
          />
          <Route path='/company/:companyID' element={<CompanyProfile />} />
          <Route
            path='/university/:universityID'
            element={<UniversityProfile />}
          />
          <Route path='/Jobs' element={<Jobs />} />
          <Route
            path='/Jobs/Collection/:jobID'
            element={
              isMobile ? <Navigate to='/jobs' replace /> : <JobsCollection />
            }
          />
          <Route path='/Jobs/Collection/:jobID' element={<JobsCollection />} />
          <Route path='/settings' element={<Settings />}>
            <Route
              index
              element={<Navigate to='accountPreferences' replace />}
            />
            <Route path='accountPreferences' element={<AccountPreferences />} />
            <Route path='sign-in-and-security' element={<SigninSecurity />} />
            <Route path='visibility' element={<Visibility />} />
            <Route path='dataPrivacy' element={<DataPrivacy />} />
            <Route path='ads' element={<AdvertisingData />} />
            <Route path='notifications' element={<Notifications />} />
            <Route
              path='sign-in-and-security/resetPassword'
              element={<PasswordReset />}
            />
            <Route path='accountPreferences/darkMode' element={<DarkMode />} />
          </Route>

          <Route
            path='/Messaging'
            element={<Messaging setMobileActiveChat={setMobileActiveChat} />}
          />
          <Route
            path='/MyNetwork'
            element={
              <MyNetwork
                pendingRequests={pendingRequests}
                isLoading={isLoading}
              />
            }
          />
          <Route path='/login' element={<Navigate to='/home' />} />
          <Route
            path='/verifyAccount/:token'
            element={<AccountVerificationPage />}
          />
        </Routes>
      </div>
      {/* Mobile Footer */}
      <div className='fixed bottom-0 left-0 right-0 z-50 block lg:hidden'>
        <MobileFooter onPostClick={() => setIsOpen(true)} />
      </div>
      {/* Mobile Post Form */}
      {isOpen && (
        <div
          className={`fixed bottom-0 left-0 z-[999] flex h-full w-full transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <MobilePostForm
            onClose={() => setIsOpen(false)}
            profilePicture={profilePicture}
          />
        </div>
      )}

      {mobileActiveChat.isActive && (
        <div className='fixed bottom-0 left-0 z-[50] flex h-full w-full translate-y-0 transition-transform duration-300'>
          <ChatModal
            onClose={() =>
              setMobileActiveChat({ isActive: false, friendID: null })
            }
            profilePicture={profilePicture}
            friendID={mobileActiveChat.friendID}
          />
        </div>
      )}
    </div>
  );
}

export default AuthenticatedRoutes;
