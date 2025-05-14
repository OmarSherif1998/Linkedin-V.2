/** @format */
import { useNavigation } from "../../hooks/useNavigation";
import useThemeClasses from "../../hooks/useThemeClasses";
const AccountDropdown = ({ title, user, handleLogout }) => {
  const { NavigateToProfile, NavigateToSettings } = useNavigation();
  const { componentBGColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div className={`relative`}>
      <h3 className="ml-3 flex cursor-pointer items-center text-xs font-normal">
        {title}
      </h3>

      <ul
        className={`${componentBGColorClass} absolute right-0 z-10 mt-2 w-[14rem] rounded-lg rounded-t-none border border-gray-300 shadow-lg`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={user?.profilePicture}
              alt=""
              className="size-12 shrink-0 rounded-full border border-gray-300 bg-white object-cover"
            />

            <div>
              <h1 className="text-xs font-semibold">
                {user?.firstName + " " + user?.lastName}
              </h1>
              <p className="text-[9px] text-gray-600">{user?.bio}</p>
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
          onClick={handleLogout}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
