/** @format */

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShieldIcon from "@mui/icons-material/Shield";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
const sidebarData = [
  {
    label: "Account preferences",
    url: "accountPreference",
    Icon: PersonIcon,
  },
  { label: "Sign in & security", url: "signIn", Icon: LockIcon },
  { label: "Visibility", url: "visibility", Icon: VisibilityIcon },
  { label: "Data privacy", url: "dateprivacy", Icon: ShieldIcon },
  { label: "Advertising data", url: "ads", Icon: NewspaperIcon },
  { label: "Notifications", url: "notifications", Icon: NotificationsIcon },
];
function SettingsSidebar({
  userProfilePicture,
  handleActiveSection,
  activeSection,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white p-10">
      <header className="flex gap-2">
        <img src={userProfilePicture} alt="" className="size-10 rounded-full" />
        <h1 className="text-4xl font-semibold">Settings</h1>
      </header>
      <section className="mt-10 flex flex-col gap-8 text-lg">
        {sidebarData.map((data, idx) => {
          return (
            <div
              key={idx}
              className={`flex items-center gap-2 font-semibold hover:cursor-pointer ${
                activeSection === data.label ? "text-green-700" : null
              } `}
              onClick={() => handleActiveSection(data.label)}
            >
              <data.Icon
                className={`text-gray-600 ${
                  activeSection === data.label ? "text-green-700" : null
                }`}
              />
              <p> {data.label}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default SettingsSidebar;
