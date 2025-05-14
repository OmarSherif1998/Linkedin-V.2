import { useDispatch } from "react-redux";
import { useUser } from "../../../hooks/useUser";
import { sidebarData } from "../../../staticData/SettingsData";
import { NavLink } from "react-router-dom";
import { setActiveSection } from "../../../Redux/sllices/settingsSlice";
import useThemeClasses from "../../../hooks/useThemeClasses";
function SettingsSidebar() {
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  const { profilePicture } = useUser();
  const dispatch = useDispatch();
  return (
    <nav
      className={`flex min-h-screen flex-col gap-10 ${componentBGColorClass} p-10`}
    >
      <section className="flex items-end gap-5">
        <img src={profilePicture} alt="" className="rounded-full size-8" />
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
    </nav>
  );
}

export default SettingsSidebar;
