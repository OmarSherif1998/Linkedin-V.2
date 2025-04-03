/** @format */
import { useNavigation } from "../../hooks/useNavigation";
const AccountDropdown = ({ title, user, handleLogout }) => {
  const { NavigateToProfile, NavigateToSettings } = useNavigation();

  return (
    <div className="relative">
      <h3 className="flex items-center ml-3 text-xs font-normal cursor-pointer">
        {title}
      </h3>

      <ul className="absolute right-0 z-10 mt-2 w-[14rem] rounded-lg rounded-t-none border border-gray-300 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={user?.profilePicture}
              alt=""
              className="object-contain w-16 h-8 bg-white border border-gray-300 rounded-full"
            />
            <div>
              <h1 className="font-semibold">
                {user?.firstName + " " + user?.lastName}
              </h1>
              <p className="text-sm text-gray-600">{user?.bio}</p>
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
        <li className="p-3 text-sm cursor-pointer hover:bg-gray-100">
          Account
        </li>
        <li className="p-3 text-sm cursor-pointer hover:bg-gray-100">
          <button onClick={NavigateToSettings}>Settings & Privacy</button>
        </li>
        <li className="p-3 text-sm cursor-pointer hover:bg-gray-100">Help</li>
        <li className="p-3 text-sm cursor-pointer hover:bg-gray-100">
          Language
        </li>
        <hr />
        <li
          className="p-3 text-sm cursor-pointer hover:bg-gray-100"
          onClick={handleLogout}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
