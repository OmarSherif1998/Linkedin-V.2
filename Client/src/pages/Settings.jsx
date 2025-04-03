/** @format */

import { useUser } from "../hooks/useUser";
import { useSearchParams } from "react-router-dom";
import SettingsSidebar from "../components/Settings/SettingsSidebar";
import SigninSecurity from "../components/Settings/SigninSecurity";
import AccountPreferences from "../components/Settings/AccountPreferences";
import Visibility from "../components/Settings/Visibility";
import DataPrivacy from "../components/Settings/DataPrivacy";
import Notifications from "../components/Settings/Notifications";
import AdvertisingData from "../components/Settings/AdvertisingData";

function Settings() {
  const user = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section") || "Account preferences";
  const handleActiveSection = (label) => {
    setSearchParams({ section: label });
  };

  const formWidth = "lg:w-[70%]";
  const ActiveSection = (activeSection) => {
    switch (activeSection) {
      case "Account preferences":
        return <AccountPreferences formWidth={formWidth} />;
      case "Sign in & security":
        return <SigninSecurity user={user} formWidth={formWidth} />;
      case "Visibility":
        return <Visibility />;
      case "Data privacy":
        return <DataPrivacy />;
      case "Advertising data":
        return <AdvertisingData />;
      case "Notifications":
        return <Notifications />;
      default:
        return <AccountPreferences />;
    }
  };

  return (
    <div className="flex w-full">
      <SettingsSidebar
        userProfilePicture={user.profilePicture}
        handleActiveSection={handleActiveSection}
        activeSection={activeSection}
      />

      <div className="flex justify-center flex-grow py-10">
        {ActiveSection(activeSection)}
      </div>
    </div>
  );
}

export default Settings;
