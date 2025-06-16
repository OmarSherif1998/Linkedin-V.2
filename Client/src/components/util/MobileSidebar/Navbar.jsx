import { Avatar } from "@mui/material";
import useThemeClasses from "../../../hooks/useThemeClasses";
import useUser from "../../../hooks/useUser";
import useNavigation from "../../../hooks/useNavigation";
function Navbar({ onClose }) {
  const { textColorClass } = useThemeClasses();
  const user = useUser();
  const currentExperience = user?.experiences?.find((exp) => exp.isCurrent);
  const { NavigateToProfile } = useNavigation();

  return (
    <div className="mb-2 flex flex-col">
      <div className="flex border-b border-gray-600 p-4">
        <div
          className="flex flex-col items-start gap-3"
          onClick={() => {
            NavigateToProfile();
            onClose();
          }}
        >
          <Avatar
            src={user?.profilePicture}
            className="size-10 border border-gray-500"
          />
          <div>
            <h3
              className={`${textColorClass} pb-1 font-semibold`}
              onClick={() => {
                NavigateToProfile();
                onClose();
              }}
            >
              {user?.firstName + " " + user?.lastName}
            </h3>
            <p className={`pb-1 text-xs font-thin ${textColorClass}`}>
              {user?.bio}
            </p>
            <p className={`text-xs font-thin ${textColorClass}`}>
              {user?.city + " " + user?.location}
            </p>

            <section className="flex items-center gap-1">
              <img src="" alt="" />
              <p className={`text-xs font-thin ${textColorClass}`}>
                {currentExperience.companyName}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
