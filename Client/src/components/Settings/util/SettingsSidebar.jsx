import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../../../staticData/SettingsData";
import { setActiveSection } from "../../../Redux/sllices/settingsSlice";
import useUser from "../../../hooks/useUser";
import useThemeClasses from "../../../hooks/useThemeClasses";
// import ChooseOptionButton from "./util/ChooseOptionButton";
import BackButton from "../util/BackButton";
function SettingsSidebar({ isMobile }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  const { profilePicture } = useUser();
  const dispatch = useDispatch();
  return (
    <nav>
      <BackButton activeSection={"Settings"} />
      <div
        className={`flex min-h-screen flex-col gap-5 p-10 ${componentBGColorClass} `}
      >
        <section className="flex w-full justify-between"> </section>
        <section className="flex items-end gap-5">
          <img src={profilePicture} alt="" className="size-8 rounded-full" />
          <h1 className={`${textColorClass} text-3xl font-semibold`}>
            Settings
          </h1>{" "}
        </section>
        <ul className="space-y-10">
          {sidebarData.map(({ label, path, Icon }) => (
            <li key={path}>
              <NavLink
                onClick={() => {
                  dispatch(setActiveSection(label));
                }}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-5 text-xl font-medium ${
                    isActive
                      ? `text-green-700`
                      : `${textColorClass} hover:text-green-700`
                  }`
                }
              >
                <Icon />
                <p> {label}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SettingsSidebar;
