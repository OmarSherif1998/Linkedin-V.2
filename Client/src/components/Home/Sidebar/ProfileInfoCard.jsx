import useThemeClasses from "../../../hooks/useThemeClasses";
import useNavigation from "../../../hooks/useNavigation";
import useUser from "../../../hooks/useUser";
import LoadingSpinner from "../../util/LoadingSpinner";

function ProfileInfoCard() {
  const { textColorClass, componentBGColorClass, borderClass, darkMode } =
    useThemeClasses();
  const {
    coverPicture,
    profilePicture,
    firstName,
    lastName,
    bio,
    location,
    city,
    experiences,
  } = useUser();

  const experience =
    Array.isArray(experiences) && experiences.length > 0
      ? experiences[0]
      : null;

  const { NavigateToProfile } = useNavigation();
  return (
    <div
      onClick={NavigateToProfile}
      className={`relative flex flex-col items-start gap-1 rounded-xl pb-3 ${borderClass} ${componentBGColorClass}`}
    >
      <div className="relative h-[5rem] w-full cursor-pointer">
        <img
          src={coverPicture}
          alt=""
          className="h-[80%] w-full rounded-t-lg object-cover"
        />
        <img
          src={profilePicture}
          alt="profilePicture"
          className="absolute -bottom-[20%] left-[8%] z-10 size-16 transform rounded-full border bg-white object-cover"
        />
      </div>

      <button className={`mt-5 flex flex-col pl-5`}>
        <h2
          className={`${textColorClass} text-lg font-semibold hover:underline`}
        >
          {firstName} {lastName}
        </h2>
      </button>

      <span
        className={`pl-5 pr-3 text-start text-[9px] ${
          darkMode ? textColorClass : "text-gray-600"
        }`}
      >
        {bio || "Software Engineer"}
      </span>
      <span
        className={`px-5 text-start text-[10px] ${
          darkMode ? textColorClass : "text-gray-600"
        }`}
      >
        {city}, {location}
      </span>
      <div
        className={`px-5 text-start text-[10px] ${
          darkMode ? textColorClass : "text-gray-600"
        }`}
      >
        <span className="flex items-center gap-1 font-bold">
          {experience ? (
            <>
              <img
                src={experience.company[0].profilePicture}
                alt=""
                className="size-5"
              />
              {experience.company[0].name}
            </>
          ) : (
            <LoadingSpinner />
          )}
        </span>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
