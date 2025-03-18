/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { login, logout, selectUser } from "../Redux/sllices/userSlice.js";
import { fetchMyData } from "../api/userAPI.js";
import SignUp from "./SignUp.jsx";
import Home from "./Home.jsx";
import MyNetwork from "./MyNetwork.jsx";
import UserProfile from "./UserProfile.jsx";
import LandingPage from "./LandingPage.jsx";
import LoadingScreen from "../components/util/LoadingScreen.jsx";
import Header from "../components/util/Header.jsx";
import Settings from "./Settings.jsx";
import useLoading from "../hooks/useLoading.js";
import MobileHeader from "../components/util/MobileHeader.jsx";
import { useNavigation } from "../hooks/useNavigation.js";
import MobileChat from "./MobileChat.jsx";
import MobileFooter from "../components/util/MobileFooter.jsx";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { NavigateToLogin } = useNavigation();
  const { loading, setLoading } = useLoading();
  const [isExpired, setIsExpired] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsExpired(true);
    NavigateToLogin();
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      const currentPath = window.location.pathname;

      // Allow users to access signup without checking auth
      if (currentPath === "/signup") {
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
        console.error("Error fetching user data:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, setLoading]);
  if (loading) return <LoadingScreen />;

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center ${
        user ? "bg-red-900" : "bg-white"
      }`}
    >
      {!user ? (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          {isExpired && <Route path="/*" element={<Navigate to="/login" />} />}
        </Routes>
      ) : (
        <>
          <div className="w-full">
            <div className="hidden lg:block">
              <Header />
            </div>

            <div className="block lg:hidden">
              <MobileHeader
                profilePicture={user.profilePicture}
                _id={user._id}
              />
            </div>

            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<UserProfile type="Me" />} />
                <Route
                  path="/VisitedProfile"
                  element={<UserProfile type="visit" />}
                />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Chat" element={<MobileChat />} />
                <Route path="/MyNetwork" element={<MyNetwork />} />
                <Route path="/login" element={<Navigate to="/home" />} />
              </Routes>
            </div>

            <div className="block lg:hidden">
              <MobileFooter />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
