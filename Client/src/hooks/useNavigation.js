/** @format */

import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();
  return {
    NavigateToHome: () => navigate("/"),
    NavigateToMyNetwork: () => navigate("/MyNetwork"),
    NavigateToProfile: () => navigate("/profile"),
    NavigateToLogin: () => navigate("/login"),
    NavigateToSettings: () => navigate("/Settings?section=Account+preferences"),
    NavigateToChat: () => navigate("/Chat"),
    NavigateToJobs: () => navigate("/Jobs"),
    NavigateToCompany: (companyID) => navigate(`/company/${companyID}`),
    NavigateToVisitedProfile: (userID) => {
      navigate(`/VisitedProfile?visitedId=${userID}`);
    },
    NavigateToSignup: () => navigate("/signup"),
  };
}
