/** @format */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../Redux/sllices/userSlice";
import { useNavigation } from "../../hooks/useNavigation";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountDropdown from "./AccountDropdown";
import useThemeClasses from "../../hooks/useThemeClasses";
function Headeroptions({ avatar, Icon, title, isSpecial, location }) {
  const { textColorClass, darkMode, componentBGColorClass } = useThemeClasses();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { NavigateToHome, NavigateToMyNetwork, NavigateToChat } =
    useNavigation();
  const [dropDown, setDropDown] = useState(false);
  const handleAccountDropDown = () => {
    setDropDown(!dropDown);
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    NavigateToHome();
  };
  return (
    <div
      onClick={
        title === "Home"
          ? NavigateToHome
          : title === "My Network"
            ? NavigateToMyNetwork
            : title === "Messaging"
              ? NavigateToChat
              : null
      }
      className={`${textColorClass} flex cursor-pointer flex-col items-center justify-center`}
    >
      <div className="flex">
        {Icon && (
          <Icon
            style={
              isSpecial
                ? { color: "#e6c611", fontSize: "2rem" }
                : location === "/home" && title === "Home"
                  ? {
                      color: `${darkMode ? "" : "black"}`,
                      fontSize: "2rem",
                    }
                  : { color: "gray", fontSize: "2rem" }
            }
          />
        )}
      </div>

      {avatar && (
        <Avatar
          onClick={handleAccountDropDown}
          src={user?.profilePicture}
          className="border border-gray-500"
          style={{ height: "2rem", width: "2rem" }}
        />
      )}
      {title === "Me" ? (
        <div onClick={handleAccountDropDown} className="flex flex-col">
          <h3 className="ml-3 flex items-center text-xs font-normal">
            {title} <ArrowDropDownIcon />
          </h3>
          {dropDown === true ? (
            <AccountDropdown user={user} handleLogout={handleLogout} />
          ) : null}
        </div>
      ) : (
        <h3
          className={
            (location === "/home" && title === "Home") ||
            (title === "My Network" && location === "/MyNetwork")
              ? `w-20 border-b-2 border-${textColorClass} pb-1 text-center text-xs font-normal ${textColorClass}`
              : "text-xs font-normal"
          }
        >
          {title}{" "}
        </h3>
      )}
    </div>
  );
}

export default Headeroptions;
