/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "../Redux/sllices/userSlice.js";
import { fetchMyData } from "../api/userAPI.js";
import { useNavigation } from "../hooks/useNavigation.js";
import PublicRoutes from "../routes/PublicRoutes.jsx";
import AuthenticatedRoutes from "../routes/AuthenticatedRoutes.jsx";
import LoadingScreen from "../components/util/LoadingScreen.jsx";
import { useQuery } from "@tanstack/react-query";
import useToken from "../hooks/useToken.js";
import useThemeClasses from "../hooks/useThemeClasses.js";
import { setDarkMode } from "../Redux/sllices/themeSlice.js";

function App() {
  const token = useToken();
  const user = useSelector(selectUser);
  const { backgroundClass } = useThemeClasses();
  // console.log(BGtheme);
  const dispatch = useDispatch();
  const { NavigateToLogin } = useNavigation();
  const [isExpired, setIsExpired] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsExpired(true);
    NavigateToLogin();
  };
  const { data, isLoading } = useQuery({
    queryKey: ["UserDetails"],
    queryFn: () => fetchMyData(token),
    enabled: !!token && !user,
    retry: false,
    gcTime: 0,
  });

  useEffect(() => {
    if (token) {
      dispatch(login(data));
    } else {
      handleLogout();
    }
  }, [data]);

  useEffect(() => {
    if (user?.darkMode !== undefined) {
      dispatch(setDarkMode(user.darkMode));
      localStorage.setItem("darkMode", user.darkMode);
    }
  }, [user, dispatch]);

  // Show loading screen if we're loading or if we have a token but no user yet
  if ((isLoading && token) || (token && !user)) return <LoadingScreen />;
  // if (true) return <LoadingScreen />;

  return (
    <div className={`min-w-screen flex min-h-screen flex-col items-center`}>
      {user === null ? (
        <div className="w-full bg-white">
          <PublicRoutes />
        </div>
      ) : (
        <div className={`${backgroundClass} w-full`}>
          <AuthenticatedRoutes
            isExpired={isExpired}
            profilePicture={user?.profilePicture}
            _id={user?._id}
          />
        </div>
      )}
    </div>
  );
}
export default App;
