import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";

function PublicRoutes({ isExpired }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      {isExpired && <Route path="/*" element={<Navigate to="/login" />} />}
    </Routes>
  );
}

export default PublicRoutes;
