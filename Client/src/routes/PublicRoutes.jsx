import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../components/LoginComponents/ResetPassword/ForgetPassword";
function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
    </Routes>
  );
}

export default PublicRoutes;
