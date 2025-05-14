import { useSelector } from "react-redux";
import useThemeClasses from "../../../hooks/useThemeClasses";
import { useNavigation } from "../../../hooks/useNavigation";
import { selectUser } from "../../../Redux/sllices/userSlice";

function ProfileInfoCard() {
  const { textColorClass, componentBGColorClass, borderClass, darkMode } =
    useThemeClasses();
  const user = useSelector(selectUser);
  const { NavigateToProfile } = useNavigation();
  return (
    <div
      onClick={NavigateToProfile}
      className={`border-lightslategray relative flex flex-col items-center rounded-xl ${borderClass} pb-3 ${componentBGColorClass}`}
    >
      <div className="relative h-[5rem] w-full cursor-pointer">
        <img
          src={user?.coverPicture}
          alt=""
          className="object-cover w-full h-full rounded-t-lg"
        />
        <img
          src={user?.profilePicture}
          alt="profilePicture"
          className="absolute z-10 object-cover w-20 h-20 transform -translate-x-1/2 bg-white border rounded-full -bottom-10 left-1/2"
        />
      </div>

      <button className={`mt-10 flex flex-col items-center`}>
        <h2 className={`${textColorClass} text-lg hover:underline`}>
          {user?.firstName} {user?.lastName}
        </h2>
      </button>

      <span
        className={`text-center text-xs ${
          darkMode ? textColorClass : "text-gray-600"
        }`}
      >
        {user?.bio || "Software Engineer"}
      </span>
    </div>
  );
}

export default ProfileInfoCard;
