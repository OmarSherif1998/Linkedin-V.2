/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../Redux/sllices/userSlice.js";
import { fetchMyData } from "../api/userAPI.js";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "../hooks/useNavigation.js";
import useUser from "../hooks/useUser.js";
import useToken from "../hooks/useToken.js";
import useThemeClasses from "../hooks/useThemeClasses.js";
import PublicRoutes from "../routes/PublicRoutes.jsx";
import AuthenticatedRoutes from "../routes/AuthenticatedRoutes.jsx";
import LoadingScreen from "../components/util/LoadingScreen.jsx";
import handleLogout from "../functions/handleLogout.js";

function App() {
  const token = useToken();
  const user = useUser();
  const dispatch = useDispatch();
  const { NavigateToLogin } = useNavigation();
  const { backgroundClass } = useThemeClasses();

  const { data, isLoading } = useQuery({
    queryKey: ["UserDetails"],
    queryFn: () => fetchMyData(token),
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (token && data) {
      dispatch(login(data));
    } else if (!token) {
      handleLogout(dispatch, NavigateToLogin);
    }
  }, [token, dispatch, data]);

  // Show loading screen if we're loading or if we have a token but no user yet
  if ((isLoading && token) || (token && !user)) return <LoadingScreen />;
  return (
    <div className={`min-w-screen flex min-h-screen flex-col items-center`}>
      {user && token ? (
        <div className={`${backgroundClass} w-full`}>
          <AuthenticatedRoutes
            profilePicture={user?.profilePicture}
            _id={user?._id}
          />
        </div>
      ) : (
        <div className="w-full bg-white">
          <PublicRoutes />
        </div>
      )}
    </div>
  );
}
export default App;
