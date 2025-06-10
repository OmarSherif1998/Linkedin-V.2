/** @format */
import { useMemo, useState } from "react";
import { Avatar } from "@mui/material";

import useNavigation from "../../hooks/useNavigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountDropdown from "./AccountDropdown";
import useThemeClasses from "../../hooks/useThemeClasses";
import useUser from "../../hooks/useUser";
import handleLogout from "../../functions/handleLogout";

function Headeroptions({ avatar, Icon, title, isSpecial, pathName }) {
  const { profilePicture, firstName, lastName, bio } = useUser();

  const { textColorClass, darkMode } = useThemeClasses();
  const [dropDown, setDropDown] = useState(false);
  const isJobNav = pathName?.startsWith("/Jobs/Collection");

  const {
    NavigateToHome,
    NavigateToMyNetwork,
    NavigateToChat,
    NavigateToJobs,
  } = useNavigation();

  const navigationMap = {
    Home: pathName === "/home" ? null : NavigateToHome,
    "My Network": NavigateToMyNetwork,
    Messaging: NavigateToChat,
    Jobs: NavigateToJobs,
  };
  const iconStyle = {
    fontSize: "2rem",
    color: isSpecial
      ? "#e6c611"
      : pathName === "/home" && title === "Home"
        ? darkMode
          ? "white"
          : "black"
        : "gray",
  };

  const isActiveMap = useMemo(
    () => ({
      Home: pathName === "/home",
      "My Network": pathName === "/MyNetwork",
      Messaging: pathName === "/Chat",
      Jobs: pathName?.startsWith("/Jobs"),
    }),
    [pathName],
  );

  const isActive = isActiveMap[title];

  const handleAccountDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div
      onClick={navigationMap[title] || null}
      className={`${textColorClass} flex cursor-pointer flex-col items-center justify-center`}
    >
      <div className="flex">{Icon && <Icon style={iconStyle} />}</div>

      {avatar && (
        <Avatar
          onClick={handleAccountDropDown}
          src={profilePicture}
          className="border border-gray-500"
          style={{ height: "2rem", width: "2rem" }}
        />
      )}
      {title === "Me" ? (
        <div onClick={handleAccountDropDown} className="flex flex-col">
          <h3 className="flex items-center ml-3 text-xs font-normal">
            {!isJobNav ? (
              <>
                {title}
                <ArrowDropDownIcon />
              </>
            ) : null}
          </h3>
          {dropDown === true ? (
            <AccountDropdown
              profilePicture={profilePicture}
              firstName={firstName}
              lastName={lastName}
              bio={bio}
              handleLogout={handleLogout}
            />
          ) : null}
        </div>
      ) : isJobNav ? null : (
        <h3
          className={`pb-1 text-center text-xs font-normal transition-all duration-200 ${
            isActive
              ? `w-20 border-b-2 border-${textColorClass} ${textColorClass}`
              : "w-20 border-b-2 border-transparent text-gray-400"
          }`}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

export default Headeroptions;
