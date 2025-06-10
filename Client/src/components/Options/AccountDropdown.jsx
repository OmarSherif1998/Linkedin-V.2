/** @format */
import { useDispatch } from "react-redux";
import useNavigation from "../../hooks/useNavigation";
import useThemeClasses from "../../hooks/useThemeClasses";
const AccountDropdown = ({
  title,
  profilePicture,
  firstName,
  lastName,
  bio,
  handleLogout,
}) => {
  const dispatch = useDispatch();

  const { NavigateToProfile, NavigateToSettings, NavigateToLogin } =
    useNavigation();
  const { componentBGColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div className={`relative`}>
      <h3 className="flex items-center ml-3 text-xs font-normal cursor-pointer">
        {title}
      </h3>

      <ul
        className={`${componentBGColorClass} absolute right-0 z-10 mt-2 w-[14rem] rounded-lg rounded-t-none border border-gray-300 shadow-lg`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={profilePicture}
              alt=""
              className="object-cover bg-white border border-gray-300 rounded-full size-12 shrink-0"
            />

            <div>
              <h1 className="text-xs font-semibold">
                {firstName + " " + lastName}
              </h1>
              <p className="text-[9px] text-gray-600">{bio}</p>
            </div>
          </div>
          <button
            onClick={NavigateToProfile}
            className="mt-2 w-full rounded-full border border-LinkedInBlue p-[0.1rem] px-4 text-xs font-semibold text-LinkedInBlue hover:bg-LinkedInBlue hover:text-white"
          >
            View Profile
          </button>
        </div>
        <hr />
        <li className={`${hoverColorClass} cursor-pointer p-3 text-sm`}>
          Account
        </li>
        <li className={`${hoverColorClass} cursor-pointer p-3 text-sm`}>
          <button onClick={NavigateToSettings}>Settings & Privacy</button>
        </li>
        <li className={`${hoverColorClass} cursor-pointer p-3 text-sm`}>
          Help
        </li>
        <li className={`${hoverColorClass} cursor-pointer p-3 text-sm`}>
          Language
        </li>
        <hr />
        <li
          className={`${hoverColorClass} cursor-pointer rounded-b-lg p-3 text-sm`}
          onClick={() => handleLogout(dispatch, NavigateToLogin)}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
