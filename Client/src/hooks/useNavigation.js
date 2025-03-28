/** @format */

import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  return {
    NavigateToHome: () => navigate("/"),
    NavigateToMyNetwork: () => navigate("/MyNetwork"),
    NavigateToProfile: () => navigate("/profile"),
    NavigateToLogin: () => navigate("/login"),
    NavigateToSettings: () => navigate("/Settings"),
    NavigateToChat: () => navigate("/Chat"),
    NavigateToVisitedProfile: (userID) => {
      navigate(`/VisitedProfile?visitedId=${userID}`);
    },
  };
}
