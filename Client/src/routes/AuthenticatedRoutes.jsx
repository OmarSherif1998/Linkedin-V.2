import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useServerConnection } from "../hooks/useServerConnection";
import { setDarkMode } from "../Redux/sllices/themeSlice";
import { useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import Home from "../pages/Home";
import MyNetwork from "../pages/MyNetwork";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import Header from "../components/util/Header";
import MobileHeader from "../components/util/MobileHeader";
import MobileFooter from "../components/util/MobileFooter";
import MobilePostForm from "../components/post/MobilePostForm";
import Messaging from "../pages/Messaging";
import AccountPreferences from "../components/Settings/Sections/AccountPreferences";
import SigninSecurity from "../components/Settings/Sections/SigninSecurity";
import PasswordReset from "../components/Settings/passowrdForm/PasswordReset";
import Visibility from "../components/Settings/Sections/Visibility";
import DataPrivacy from "../components/Settings/Sections/DataPrivacy";
import AdvertisingData from "../components/Settings/Sections/AdvertisingData";
import Notifications from "../components/Settings/Sections/Notifications";
import AccountVerificationPage from "../pages/AccountVerificationPage";
import DarkMode from "../components/Settings/DarkMode";

function AuthenticatedRoutes({ profilePicture, _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();
  useServerConnection({
    user,
  });

  useEffect(() => {
    if (user?.darkMode !== undefined) {
      dispatch(setDarkMode(user.darkMode));
      localStorage.setItem("darkMode", user.darkMode);
    }
  }, [user?.darkMode, dispatch]);

  return (
    <div className="relative w-full min-h-screen pb-14 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="sticky top-0 z-50 block lg:hidden">
        <MobileHeader profilePicture={profilePicture} _id={_id} />
      </div>

      <div className="w-full overflow-hidden">
        {/*removed min-screen-h to remove vertical scroll from the window */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile type="Me" />} />
          <Route
            path="/VisitedProfile"
            element={<UserProfile type="visit" />}
          />

          <Route path="/settings" element={<Settings />}>
            <Route
              index
              element={<Navigate to="accountPreferences" replace />}
            />
            <Route path="accountPreferences" element={<AccountPreferences />} />
            <Route path="sign-in-and-security" element={<SigninSecurity />} />
            <Route path="visibility" element={<Visibility />} />
            <Route path="dataPrivacy" element={<DataPrivacy />} />
            <Route path="ads" element={<AdvertisingData />} />
            <Route path="notifications" element={<Notifications />} />
            <Route
              path="sign-in-and-security/resetPassword"
              element={<PasswordReset />}
            />
            <Route path="accountPreferences/darkMode" element={<DarkMode />} />
          </Route>

          <Route path="/Chat" element={<Messaging />} />
          <Route path="/MyNetwork" element={<MyNetwork />} />
          <Route path="/login" element={<Navigate to="/home" />} />
          <Route
            path="/verifyAccount/:token"
            element={<AccountVerificationPage />}
          />
        </Routes>
      </div>
      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden">
        <MobileFooter onPostClick={() => setIsOpen(true)} />
      </div>
      {/* Mobile Post Form */}
      {isOpen && (
        <div
          className={`fixed bottom-0 left-0 z-[999] flex h-full w-full transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <MobilePostForm
            onClose={() => setIsOpen(false)}
            profilePicture={profilePicture}
          />
        </div>
      )}
      {/* {isExpired && <Route path="/*" element={<Navigate to="/login" />} />} */}
    </div>
  );
}

export default AuthenticatedRoutes;
