/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "../Redux/sllices/userSlice.js";
import { fetchMyData } from "../api/userAPI.js";
import { useNavigation } from "../hooks/useNavigation.js";
import PublicRoutes from "../routes/PublicRoutes.jsx";
import AuthenticatedRoutes from "../routes/AuthenticatedRoutes.jsx";
import LoadingScreen from "../components/util/LoadingScreen.jsx";
import useLoading from "../hooks/useLoading.js";

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
        user ? "bg-BgColor" : "bg-white"
      }`}
    >
      {!user ? (
        <PublicRoutes isExpired={isExpired} />
      ) : (
        <AuthenticatedRoutes
          profilePicture={user.profilePicture}
          _id={user._id}
        />
      )}
    </div>
  );
}

export default App;
