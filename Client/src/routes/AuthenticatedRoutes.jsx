import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MyNetwork from "../pages/MyNetwork";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import Header from "../components/util/Header";
import MobileHeader from "../components/util/MobileHeader";
import MobileFooter from "../components/util/MobileFooter";
import MobilePostForm from "../components/post/MobilePostForm";
import Messaging from "../pages/Messaging";
import Test from "../components/Test";

function AuthenticatedRoutes({ profilePicture, _id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full pb-14 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="sticky top-0 z-50 block lg:hidden">
        <MobileHeader profilePicture={profilePicture} _id={_id} />
      </div>

      <div className="overflow-hidden">
        {/*removed min-screen-h to remove vertical scroll from the window */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile type="Me" />} />
          <Route
            path="/VisitedProfile"
            element={<UserProfile type="visit" />}
          />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Chat" element={<Messaging />} />
          <Route path="/MyNetwork" element={<MyNetwork />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Navigate to="/home" />} />
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
    </div>
  );
}

export default AuthenticatedRoutes;
