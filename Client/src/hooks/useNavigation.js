/** @format */

import { useNavigate } from 'react-router-dom';

export default function useNavigation() {
  const navigate = useNavigate();
  return {
    NavigateToHome: () => navigate('/'),
    NavigateToSearch: (searchParam) => navigate(`/search/${searchParam}`),
    NavigateToMyNetwork: () => navigate('/MyNetwork'),
    NavigateToProfile: () => navigate('/profile'),
    NavigateToLogin: () => navigate('/login'),
    NavigateToSettings: () => navigate('/Settings?section=Account+preferences'),
    NavigateToMessaging: () => navigate('/Messaging'),
    NavigateToJobs: () => navigate('/Jobs'),
    NavigateToJobCollection: (jobID) => navigate(`/Jobs/Collection/${jobID}`),
    NavigateToCompany: (companyID) => navigate(`/company/${companyID}`),
    NavigateToUniversity: (universityID) =>
      navigate(`/university/${universityID}`),

    NavigateToVisitedProfile: (userID) => {
      navigate(`/VisitedProfile?visitedId=${userID}`);
    },
    NavigateToSignup: () => navigate('/signup'),
  };
}
