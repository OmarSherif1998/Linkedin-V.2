import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SettingsSidebar from "../components/Settings/util/SettingsSidebar";

export default function Settings() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    path === "/Settings" ? (
      <SettingsSidebar />
    ) : (
      <div>
        <Outlet context={{ formWidth: "lg:w-[80%]", isMobile: isMobile }} />
      </div>
    )
  ) : (
    <div className="flex w-full">
      <SettingsSidebar />
      <main className="flex w-[70%] justify-center p-10">
        <Outlet context={{ formWidth: "lg:w-[70%]", isMobile: isMobile }} />
      </main>
    </div>
  );
}
